import express from "express"
import { Auction } from "../utils/types"
import { database } from "../utils/database"

export const showAuctions = async (req: express.Request, res: express.Response) => {
    try {
        const auctions: Auction[] = await database.select().from("auctions")

        res.status(200).send(auctions)
    } catch (error) {
        console.error('Failed to fetch auctions:', error);
        res.status(500).json({ error: "Failed to fetch auctions" })
    }
}

export const showAuction = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const auction: Auction = await database.select().from("auctions").where({ id }).first()

        if (!auction) {
            return res.status(404).json({ error: "Auction not found!" })
        }

        res.status(200).send(auction)
    } catch (error) {
        console.error('Failed to fetch auction:', error);
        res.status(500).json({ error: "Failed to fetch auction" })
    }
}

export const newAuction = async (req: express.Request, res: express.Response) => {
    try {
        const auctionData: Auction = req.body

        await database("auctions").insert(auctionData)

        res.status(200).json({ message: "Auction created successfully." })
    } catch (error) {
        console.error('Failed to create auction:', error);
        res.status(500).json({ error: "Failed to create auction." })
    }
}

export const deleteAuction = async (req: express.Request, res: express.Response) => {
    try {
        const auctionId = req.params.id

        await database("auctions").where({ id: auctionId }).del()

        res.status(200).json({ message: "Auction deleted successfully." })
    } catch (error) {
        console.error('Failed to delete auction:', error);
        res.status(500).json({ error: "Failed to delete auction." })
    }
}
