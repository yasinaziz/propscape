export class Bid {
    id: string;
    houseId: string;
    bidderId: string;
    amount: number;
    timestamp: Date;

    constructor(id: string, houseId: string, bidderId: string, amount: number) {
        this.id = id;
        this.houseId = houseId;
        this.bidderId = bidderId;
        this.amount = amount;
        this.timestamp = new Date();
    }

    validateBid(minimumIncrement: number): boolean {
        // Logic to validate the bid amount based on the minimum increment
        return this.amount >= minimumIncrement;
    }

    static calculateBidIncrement(previousBidAmount: number, incrementPercentage: number): number {
        return previousBidAmount + (previousBidAmount * incrementPercentage / 100);
    }
}