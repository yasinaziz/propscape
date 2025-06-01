export class BiddingService {
    private bids: Map<number, Array<{ bidderId: number; amount: number; timestamp: Date }>> = new Map();

    placeBid(houseId: number, bidderId: number, amount: number): boolean {
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

    getBidsForHouse(houseId: number): Array<{ bidderId: number; amount: number; timestamp: Date }> | undefined {
        return this.bids.get(houseId);
    }

    getHighestBid(houseId: number): { bidderId: number; amount: number; timestamp: Date } | null {
        const houseBids = this.bids.get(houseId);
        if (!houseBids || houseBids.length === 0) {
            return null;
        }

        return houseBids.reduce((highest, current) => {
            return current.amount > highest.amount ? current : highest;
        });
    }
}