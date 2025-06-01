export interface Bid {
  userId: string;
  amount: number;
  timestamp: Date;
}

export interface House {
  id: string;
  title: string;
  description: string;
  startingPrice: number;
  currentBid: number;
  bids: Bid[];
}