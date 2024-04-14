import express from "express"
import cors from "cors"
import session from "express-session"
import passport from "../src/middlewares/Passport.middleware"
import auctionRoutes from "../src/routes/auctions"
import bidRoutes from "../src/routes/bids"
import userRoutes from "../src/routes/users"


const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use(session({
    secret: process.env.SECRET || 'secret-session',
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/", userRoutes)
app.use("/auctions", auctionRoutes)
app.use("/bids", bidRoutes)

app.listen(PORT, () => console.info(`LISTENING TO PORT ${PORT}`))
