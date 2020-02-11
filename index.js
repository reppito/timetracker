'use strict';
//importing modules
const express = require('express')
// const passport = require('passport')
const mongoose = require('./config/mongooseconf');
const cors = require("cors")
const conf = require('./config/conf')
const body_parser = require('body-parser')
const morgan = require('morgan')

//initialize app
const app = express()

//adding to app
app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(express.static('public'));
// app.use(passport.initialize())
// app.use(passport.session())
//routes
require('./routes')(app)


app.listen(conf.port, ()=> console.log("listen at port " + conf.port))

module.exports = app

