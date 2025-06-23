const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const pool = new Pool({
  connectionString: 'postgresql://username:password@localhost:5432/propscape'
});

// Helper: Generate 6-digit OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// SEND OTP
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required.' });

  const otp = generateOtp();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  try {
    await pool.query(
      `INSERT INTO users (email, otp, otp_expires)
       VALUES ($1, $2, $3)
       ON CONFLICT (email)
       DO UPDATE SET otp = $2, otp_expires = $3`,
      [email, otp, otpExpires]
    );

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your_gmail@gmail.com',
        pass: 'your_gmail_app_password'
      }
    });

    await transporter.sendMail({
      from: '"PropScape" <your_gmail@gmail.com>',
      to: email,
      subject: 'Your PropScape OTP Code',
      text: `Your OTP code is: ${otp}`,
    });

    res.json({ message: 'OTP sent to your email.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// VERIFY OTP
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required.' });

  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    const user = result.rows[0];
    if (!user || user.otp !== otp || !user.otp_expires || new Date(user.otp_expires) < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }

    // Clear OTP
    await pool.query(
      `UPDATE users SET otp = NULL, otp_expires = NULL WHERE email = $1`,
      [email]
    );

    // Assign role based on email
    let role = user.role;
    const ownerEmails = ['owner1@yourdomain.com', 'owner2@yourdomain.com'];
    const masterEmails = ['master1@yourdomain.com', 'master2@yourdomain.com'];

    if (ownerEmails.includes(user.email)) {
      role = 'owner';
    } else if (masterEmails.includes(user.email)) {
      role = 'master';
    } else {
      role = 'user';
    }

    // Update the role in the database
    await pool.query(
      `UPDATE users SET role = $1 WHERE email = $2`,
      [role, email]
    );

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role },
      'your_jwt_secret',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'OTP verified.',
      user: { email: user.email, role },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

module.exports = router;