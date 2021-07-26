module.exports = {
    urlDB : `mongodb://${process.env.USER}:${process.env.PASSWORD}.mlab.com:49347/qrveytest`,
    port: process.env.PORT || 3000
}
