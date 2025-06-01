class BiddingController {
    private biddingService: BiddingService;

    constructor(biddingService: BiddingService) {
        this.biddingService = biddingService;
    }

    public async createBid(req: Request, res: Response): Promise<void> {
        try {
            const bidData = req.body;
            const newBid = await this.biddingService.placeBid(bidData);
            res.status(201).json(newBid);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    public async getBids(req: Request, res: Response): Promise<void> {
        try {
            const houseId = req.params.houseId;
            const bids = await this.biddingService.getBidsForHouse(houseId);
            res.status(200).json(bids);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    public async closeBid(req: Request, res: Response): Promise<void> {
        try {
            const houseId = req.params.houseId;
            const result = await this.biddingService.closeBiddingSession(houseId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default BiddingController;