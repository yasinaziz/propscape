import { Router } from 'express';
import pool from '../../db';
import multer from 'multer';
import path from 'path';

const router = Router();

const upload = multer({
  dest: path.join(__dirname, '../../uploads/'),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/carousel', upload.array('images'), async (req, res) => {
  const { title, description } = req.body;
  const files = req.files as Express.Multer.File[];
  const imagePaths = files.map(file => file.filename);

  await pool.query(
    'INSERT INTO marketing_carousels (title, description, images) VALUES ($1, $2, $3)',
    [title, description, imagePaths]
  );

  res.json({ message: 'Carousel saved!' });
});

export default router;