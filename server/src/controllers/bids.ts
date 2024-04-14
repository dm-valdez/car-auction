import express from "express"
import { NewBidRequest } from "../utils/types"
import { database } from "../utils/database"

export const newBid = async (req: express.Request, res: express.Response) => {
    try {
        const bidData: NewBidRequest = req.body
        const { user_id, auction_id, amount } = bidData

        if (!user_id || !auction_id || !amount) {
            return res.status(400).json({ error: "UserID, AuctionID, and Amount are required" })
        }

        await database("bids").insert(bidData)

        res.status(201).send("Bid created successfully.")
    } catch (error) {
        console.error("Failed to create new bid.", error)
    }
}
