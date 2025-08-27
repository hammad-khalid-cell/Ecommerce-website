import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.mjs";


dotenv.config();




passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 1️⃣ Check if user already exists in DB
        let user = await User.findOne({ googleId: profile.id });
        
        

        if (!user) {
          // 2️⃣ Create new user if not found
          user = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            profilePic : profile.photos[0].value,
          });
          await user.save();
        }

        // 3️⃣ Generate JWT
        const payload = { id: user._id, email: user.email , role : user.role};
        // const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

        // 4️⃣ Attach token + user to req.user
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['id', 'displayName', 'photos', 'email']
      

    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ facebookId: profile.id });

        if (!user) {
          user = new User({
            facebookId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
          });
          await user.save();
        }


        const payload = { id: user._id, email: user.email ,role: user.role};
        // const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;
