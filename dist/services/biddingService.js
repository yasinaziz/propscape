"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiddingService = void 0;
class BiddingService {
    constructor() {
        this.bids = new Map();
    }
    placeBid(houseId, bidderId, amount) {
        if (!this.bids.has(houseId)) {
            this.bids.set(houseId, []);
        }
        const houseBids = this.bids.get(houseId);
        const highestBid = houseBids.length > 0 ? Math.max(...houseBids.map(bid => bid.amount)) : 0;
        if (amount > highestBid) {
            houseBids.push({ bidderId, amount, timestamp: new Date() });
            return true;
        }
        return false;
    }
    getBidsForHouse(houseId) {
        return this.bids.get(houseId);
    }
    getHighestBid(houseId) {
        const houseBids = this.bids.get(houseId);
        if (!houseBids || houseBids.length === 0) {
            return null;
        }
        return houseBids.reduce((highest, current) => {
            return current.amount > highest.amount ? current : highest;
        });
    }
}
exports.BiddingService = BiddingService;
