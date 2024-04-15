import express from 'express'
import { database } from '../utils/database'
import { RegisterRequest, User } from '../utils/types'
import { randomBytes } from 'node:crypto'
import { generatePasswordHash } from '../utils/generatePasswordHash'
import passport from 'passport'

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { fullName, emailAddress, phoneNumber, password }: RegisterRequest = req.body

    if (!fullName || !emailAddress || !phoneNumber || !password) {
      return res.status(400).json({ error: 'All fields are required.' })
    }

    const salt = randomBytes(16).toString('hex')

    const hashedPassword = await generatePasswordHash(password, salt)

    await database('users').insert({
      full_name: fullName,
      email_address: emailAddress,
      phone_number: phoneNumber,
      password_hash: hashedPassword,
      password_salt: salt,
    })

    res.status(201).json({ message: 'User created successfully.' })
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ error: 'Failed to create user.' })
  }
}

export const login = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    if (req.isAuthenticated()) {
      return res.json({ message: "Already logged in.", user: req.isAuthenticated() })
    }

    passport.authenticate('local', (err: Error | null, user: User | boolean, info: { message: string }) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.status(401).send({ error: info.message })
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err)
        }

        return res.status(200).json({ message: 'Login Successful', user })
      })
    })(req, res, next)
  } catch (error) {
    console.error('Error login:', error)
    return next(error)
  }
}

export const logout = async (req: express.Request, res: express.Response) => {
  req.logout((err) => {
    if (err) {
      console.error('Error logging out:', err)
      return res.status(500).json({ error: 'Failed to logout' })
    }
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err)
        return res.status(500).json({ error: 'Failed to logout' })
      }
      res.json({ message: 'Successfully Logout!' })
    })
  })
}

export const checkUserAuth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.isAuthenticated()) {
    return res.json({ isLoggedIn: true, user: req.user })
  } else {
    return res.json({ isLoggedIn: false })
  }
}
