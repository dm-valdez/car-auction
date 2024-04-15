import express from 'express'
import { checkUserAuth, getUser, login, logout, register } from '../controllers/users'

const router = express.Router()

router.route('/user/:id').get(getUser)

router.route('/register').post(register)

router.route('/login')
  .get(checkUserAuth)
  .post(login)

router.route('/logout').get(logout)

export default router
