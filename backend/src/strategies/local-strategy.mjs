import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../models/mongoose/schemas/user.mjs";
import { comparePassword } from "../utils/helpers.mjs";


passport.serializeUser((user, done)=>{
    console.log("serializing user");
    console.log(user);
    done(null, user.id);
})

passport.deserializeUser( async(id,done)=>{
    console.log("deserializing user");
    console.log("id", id);

    try{
        const findUser   = await User.findById(id);
        if(!findUser) throw new Error("user not found");
        done(null, findUser);
    }
    catch(err){
        done(err, null);
    }
    

})

export default passport.use(
    new Strategy(async(username, password, done)=>{        
        try{
            const findUser =  await User.findOne({username});
            if(!findUser) throw new Error("User not found");
            if(!comparePassword(password , findUser.password)) throw new Error("Invalid Credentials");
            done(null, findUser);
        }
        catch(err){
            done(err, null);
        }
    })
)