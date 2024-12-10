import passport from "passport"
import { ExtractJwt, Strategy as JwtStrategy  } from "passport-jwt"
import "dotenv/config.js"
import { userService } from "../services/user.services.js"

const cookieExtractor = (req) => {
    return req.cookies.token
}

const verifyToken = async (jwt_payload, done) => {
    try {
        if(!jwt_payload) {
            return done(null, false, {messages: "nonexistent user" })
        }
        return done(null, jwt_payload)
    } catch (error) {
        return done(error, false)
    }
    
}

const strategyCurrentConfig = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: process.env.SECRET_KEY
}


passport.use('current', new JwtStrategy(strategyCurrentConfig, verifyToken))

passport.serializeUser((user, done) => {
    try {
        done(null, user._id)
    } catch (error) {
        done(error)
    }
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userService.getById(id)
        return done(null, user)
    } catch (error) {
        done(error)
    }
})

