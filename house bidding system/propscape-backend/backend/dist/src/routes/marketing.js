"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    dest: path_1.default.join(__dirname, '../../uploads/'),
    limits: { fileSize: 5 * 1024 * 1024 },
});
router.post('/carousel', upload.array('images'), async (req, res) => {
    const { title, description } = req.body;
    const files = req.files;
    const imagePaths = files.map(file => file.filename);
    await db_1.default.query('INSERT INTO marketing_carousels (title, description, images) VALUES ($1, $2, $3)', [title, description, imagePaths]);
    res.json({ message: 'Carousel saved!' });
});
exports.default = router;
