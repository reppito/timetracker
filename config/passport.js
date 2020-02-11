const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require ('../models/user')


//THIS CODE IS NOT BEING IN USED
passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((id,done) => {
    User.findById(id, (err,user) => {
        done(err,user)

    })
})

passport.use( new localStrategy(
    { usernameField : 'email'},
    (email,password,done) => {
        User.findOne({email},(err, user) => {
            if(!user) {
              return  done(null,false, {message: `user not found with this email ${email}`})
            } else {
                user.comparePassword(req.body.password, (err,isMatch) =>{
                    if (isMatch){
                    return done(null,user)
                    } else{
                        return done(null, false , {message : 'invalid password'})
                    }
                })
            }
        })
    }
))

exports.isAuthenticated = (req,res, next) => {
    if(req.isAuthenticated()){
        return next()
    } else {
        res.send (req.user)
    }
}
