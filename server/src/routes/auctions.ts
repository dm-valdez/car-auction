import express from 'express'
import { deleteAuction, newAuction, showAuction, showAuctions, updateAuction } from '../controllers/auctions'
import { getAuctionBids } from '../controllers/bids'

const router = express.Router()

router.route('/').get(showAuctions)

router.route('/:id')
  .get(showAuction)
  .put(updateAuction)
  .delete(deleteAuction)

router.route('/:id/bids').get(getAuctionBids)

router.route('/new').post(newAuction)

export default router
