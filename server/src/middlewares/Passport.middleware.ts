import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { database } from "../utils/database"
import { generatePasswordHash } from "../utils/generatePasswordHash"
import { User } from "../utils/types"

passport.use(new LocalStrategy({
    usernameField: 'emailAddress',
    passwordField: 'password'
}, async (emailAddress, password, done) => {
    try {
        const user = await database("users").where({ email_address: emailAddress }).first()

        const hashedPassword = await generatePasswordHash(password, user.password_salt)

        if (hashedPassword !== user.password_hash || !user) {
            return done(null, false, { message: 'Incorrect username or password.' })
        }

        return done(null, user)
    } catch (error) {
        return done(error)
    }
}))

passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser(async (user: User, done) => {
    const { id} = user

    try {
        const user = await database("users").where({ id }).first()
        done(null, user)
    } catch (error) {
        done(error)
    }
})

export default passport
