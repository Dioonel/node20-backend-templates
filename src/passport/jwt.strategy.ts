import { Strategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
dotenv.config();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}

const JwtStrategy = new Strategy(options, (payload, done) => {
    return done(null, payload);
});

export default JwtStrategy;