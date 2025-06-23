"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bid = void 0;
class Bid {
    constructor(id, houseId, bidderId, amount) {
        this.id = id;
        this.houseId = houseId;
        this.bidderId = bidderId;
        this.amount = amount;
        this.timestamp = new Date();
    }
    validateBid(minimumIncrement) {
        // Logic to validate the bid amount based on the minimum increment
        return this.amount >= minimumIncrement;
    }
    static calculateBidIncrement(previousBidAmount, incrementPercentage) {
        return previousBidAmount + (previousBidAmount * incrementPercentage / 100);
    }
}
exports.Bid = Bid;
