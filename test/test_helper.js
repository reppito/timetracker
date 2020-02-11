const mongoose = require("mongoose")
const User = require("../models/User")
const Task = require("../models/task")
const Project = require("../models/Project")
const url = "mongodb://test:123test@ds259518.mlab.com:59518/test_db"
mongoose.set('useCreateIndex', true)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })


var db = mongoose.connection;
before(done => {

    //connect to db test
    db.once("open", () => {
        console.log("connected to DB test")
        function clearDB() {
            var promises = [
                User.remove().exec(),
                Task.remove().exec(),
                Project.remove().exec()
            ];

            Promise.all(promises)
                .then(function () {
                    done();
                })
        }

        if (mongoose.connection.readyState === 0) {
            mongoose.connect(config.dbUrl, function (err) {
                if (err) {
                    throw err;
                }
                // clear db test before
                return clearDB();
            });
        } else {
            return clearDB();
        }
    })
        .on("error", err => console.warn("Warning", err))
})

