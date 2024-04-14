import express from "express"
import {newAuction, showAuction, showAuctions} from "../controllers/auctions"

const router = express.Router()

router.route('/').get(showAuctions)

router.route('/:id').get(showAuction)

router.route('/new').post(newAuction)

export default router
