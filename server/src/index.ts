import express from "express"
import cors from "cors"
import auctionRoutes from "../src/routes/auctions"
import bidRoutes from "../src/routes/bids"


const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use("/auctions", auctionRoutes)
app.use("/bids", bidRoutes)


app.listen(PORT, () => console.info(`LISTENING TO PORT ${PORT}`))
