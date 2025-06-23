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
Object.defineProperty(exports, "__esModule", { value: true });
class BiddingController {
    constructor(biddingService) {
        this.biddingService = biddingService;
    }
    createBid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bidData = req.body;
                const newBid = yield this.biddingService.placeBid(bidData);
                res.status(201).json(newBid);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    getBids(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const houseId = req.params.houseId;
                const bids = yield this.biddingService.getBidsForHouse(houseId);
                res.status(200).json(bids);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    closeBid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const houseId = req.params.houseId;
                const result = yield this.biddingService.closeBiddingSession(houseId);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
}
exports.default = BiddingController;
