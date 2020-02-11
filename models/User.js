const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
SALT_WORK_FACTOR = 11

let UserSchema = new Schema({
  name: {type: String, required: true},
  lastname: {type: String, required: true},
  email: {
    type: String,
    unique: true
    , required: true
  },
  password: {type: String, required: true}

},{
    timestamps : true
})

UserSchema.index({
  email: 1
}, {
  unique: true
})


UserSchema.pre('save', function (next) {
    var user = this
    if (!user.isModified('password')) return next()
  
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) return next(err)
  
      
      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) return next(err)
  
         
        user.password = hash
        next()
      })
    })
  })
  
  // UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  //   bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
  //     if (err) return cb(err)
  //     cb(null, isMatch)
  //   })
  // }

let User = mongoose.models.User || mongoose.model('User', UserSchema)



module.exports = User;