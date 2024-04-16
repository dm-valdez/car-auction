import express from 'express'
import { NewBidRequest } from '../utils/types'
import { database } from '../utils/database'

export const getAuctionBids = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params

    const auctionExists = await database('auctions').where('id', id).first()
    if (!auctionExists) {
      return res.status(404).json({ error: 'Auction not found!' })
    }

    const bids = await database('bids')
      .select()
      .where('auction_id', id)
      .orderBy('amount', 'desc')
      .limit(5)

    res.status(200).send(bids)
  } catch (error) {
    console.error('Failed to fetch auction bids:', error)
    res.status(500).json({ error: 'Failed to fetch auction bids' })
  }
}

export const newBid = async (req: express.Request, res: express.Response) => {
  try {
    const bidData: NewBidRequest = req.body
    const { user_id, auction_id, amount } = bidData

    if (!user_id || !auction_id || !amount) {
      return res.status(400).json({ error: 'UserID, AuctionID, and Amount are required' })
    }

    const existingBids = await database('bids')
      .where('auction_id', auction_id)
      .where('amount', amount)
      .count('id as count')
      .first()

    if (existingBids && Number(existingBids.count) > 0) {
      return res.status(400).json({ error: 'Sorry, somebody has bid quicker with this price. Please check the new price.' })
    }

    const highestBid = await database('bids')
      .where('auction_id', auction_id)
      .max('amount as highest')
      .first()

    if (highestBid && highestBid.highest && amount <= highestBid.highest) {
      return res.status(400).json({ error: 'Sorry, somebody has bid quicker with this price. Please check the new price.' })
    }

    await database('bids').insert(bidData)

    res.status(200).send('Bid created successfully.')
  } catch (error) {
    console.error('Failed to create new bid.', error)
  }
}
