'use strict';
// connection with db

const mongoose = require('mongoose');
const conf = require('./conf')



if (process.env.NODE_ENV !== "test") {
    const url = conf.urlDB
    mongoose.set('useCreateIndex', true)
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })


    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => console.log("connected to db prod"))
}

module.exports = mongoose
