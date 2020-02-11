const User = require('../models/User')


exports.SaveUser = (req,res) => {


    User.findOne({email: req.body.email}, (err,existUser) => {
        if (existUser){
            res.status(409).send('email already registered')
        } else {
            
            
              const user = new User ({
                email : req.body.email,
                name: req.body.name,
                lastname: req.body.lastname,
                password: req.body.password
              })
            
            
            user.save((err,user) => {
                if (err) {
                    res.status(500).send({ 
                        message:err.message
                    })
                } else {
                    res.send({message: "stored",
                              id: user._id })
                }
            })
        }
    })
}


exports.GetUsers = (req, res) => {
    User.findOne({email: req.params.email}, function(err, user) {
          if(user){
            
            res.send({
                user: user._id,
                email: user.email,
                name: user.name,
                lastname: user.lastname

            })

          } else {

            res.status(404).send({message: "user not found"})

          }
      });

}

// this was implemented thinking it should be needed but I changed it to be more focus on a API rest
// exports.Login = (req,res) => {
//     console.log(req.body)
//     User.findOne({email: req.body.email}, (err,existUser) => {
//         if (!existUser){
//             res.status(400).send('invalid email')
//         } else {
//             existUser.comparePassword(req.body.password, (err,isMatch) =>{
//                 if (isMatch){
//                     req.logIn(existUser, (err) => {
//                         if (err){
//                             res.send(err)
//                         } else {
//                             res.send('login succesfully!')
//                         }
//                     })
//                 } else res.status(403).send({
//                     error: 'invalid password'
//                 })
//             })
//                 }
//             })
//         }


// exports.logout = (req,res) => {
//     req.logout()
//     res.send('logout successfully')
// } 