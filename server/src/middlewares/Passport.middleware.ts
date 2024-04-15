import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { database } from '../utils/database'
import { generatePasswordHash } from '../utils/generatePasswordHash'
import { User } from '../utils/types'

passport.use(new LocalStrategy({
  usernameField: 'emailAddress',
  passwordField: 'password',
}, async (emailAddress, password, done) => {
  try {
    const user = await database('users')
      .where({ email_address: emailAddress })
      .first()

    const hashedPassword = await generatePasswordHash(password, user.password_salt)

    if (hashedPassword !== user.password_hash || !user) {
      return done(null, false, { message: 'Incorrect username or password.' })
    }

    const { id, full_name, email_address, phone_number, is_admin } = user

    return done(null, { id, full_name, email_address, phone_number, is_admin })
  } catch (error) {
    return done(error)
  }
}))

// @ts-ignore
passport.serializeUser((user: User, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await database('users').where({ id }).first()

    const { id: userId, full_name, email_address, phone_number, is_admin } = user

    done(null, { id: userId, full_name, email_address, phone_number, is_admin })
  } catch (error) {
    done(error)
  }
})

export default passport
