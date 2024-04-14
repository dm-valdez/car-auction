import express from "express"
import cors from "cors"
import auctionRoutes from "../src/routes/auctions"


const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use("/auctions", auctionRoutes)


app.listen(PORT, () => console.info(`LISTENING TO PORT ${PORT}`))
