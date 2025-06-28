"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await db_1.default.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user)
        return res.status(401).json({ message: 'Invalid credentials' });
    const valid = await bcryptjs_1.default.compare(password, user.password_hash);
    if (!valid)
        return res.status(401).json({ message: 'Invalid credentials' });
    const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role, name: user.name, email: user.email }, 'your_jwt_secret', // Replace with env variable in production!
    { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, role: user.role, name: user.name, email: user.email } });
});
exports.default = router;
