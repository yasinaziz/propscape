export interface House {
    id: string;
    address: string;
    price: number;
    status: 'available' | 'sold' | 'pending';
}

export interface Bid {
    id: string;
    houseId: string;
    bidderId: string;
    amount: number;
    timestamp: Date;
}