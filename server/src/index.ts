import express from 'express'
import cors from 'cors'
import session from 'express-session'
import passport from '../src/middlewares/Passport.middleware'
import auctionRoutes from '../src/routes/auctions'
import bidRoutes from '../src/routes/bids'
import userRoutes from '../src/routes/users'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: [ 'http://localhost:5173' ],
  methods: [ 'GET', 'POST', 'PUT', 'DELETE' ],
  credentials: true,
}))
app.use(express.json())

app.use(session({

  name: 'car-auction',
  secret: process.env.SESSION_SECRET || 'secret-session',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', userRoutes)
app.use('/auctions', auctionRoutes)
app.use('/bids', bidRoutes)

app.listen(PORT, () => console.info(`LISTENING TO PORT ${PORT}`))
