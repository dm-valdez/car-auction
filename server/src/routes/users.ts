import express from 'express'
import { checkUserAuth, login, logout, register } from '../controllers/users'

const router = express.Router()

router.route('/register').post(register)

router.route('/login')
  .get(checkUserAuth)
  .post(login)

router.route('/logout').get(logout)

export default router
