import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/mongoose/schema/users.mjs";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await User.findById(id);
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new GoogleStrategy(
    {
      clientID: "156168571654-6finhbpmgtmjm74b4lgflf12ojd221u9.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let findUser = await User.findOne({ googleId: profile.id });

        if (!findUser) {
          // Create new user
          const newUser = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
          });

          const savedUser = await newUser.save();
          return done(null, savedUser);
        }

        return done(null, findUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
