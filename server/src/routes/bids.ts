import express from "express"
import { newBid } from "../controllers/bids"

const router = express.Router()

router.route('/new').post(newBid)

export default router
