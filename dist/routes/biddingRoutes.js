"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../backend/db")); // adjust path as needed
const router = (0, express_1.Router)();
// List all houses
router.get('/houses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query('SELECT * FROM houses');
        res.json(result.rows);
    }
    catch (err) {
        res.status(500).json({ message: 'Database error', error: err });
    }
}));
// Place a bid on a housepsql -U nurmuhamadyasin -h localhost
router.post('/houses/:id/bid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userId, amount } = req.body;
    try {
        // Get current bid
        const houseResult = yield db_1.default.query('SELECT * FROM houses WHERE id = $1', [id]);
        if (houseResult.rows.length === 0) {
            return res.status(404).json({ message: 'House not found' });
        }
        const house = houseResult.rows[0];
        if (typeof amount !== 'number' || amount <= house.currentbid) {
            return res.status(400).json({ message: 'Bid must be higher than current bid' });
        }
        // Update current bid
        yield db_1.default.query('UPDATE houses SET currentbid = $1 WHERE id = $2', [amount, id]);
        // Optionally, insert bid into a bids table
        // await pool.query('INSERT INTO bids (house_id, user_id, amount, timestamp) VALUES ($1, $2, $3, NOW())', [id, userId, amount]);
        res.json({ message: 'Bid placed successfully', houseId: id, newBid: amount });
    }
    catch (err) {
        res.status(500).json({ message: 'Database error', error: err });
    }
}));
exports.default = router;
