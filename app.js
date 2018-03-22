const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const app = express()

const mongoose = require('mongoose')
const config = require('./config')

const router = require('./api/routes/transactions')

mongoose.connect(config.url, (err) => {
    err ? console.log('ERROR connecting to db: ' + err) : console.log('Succeeded connected to db')
})

app.use(helmet())
app.use(bodyParser.json())

/* Allow Cross Origin Resource Sharing */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET")
        return res.status(200).json({})
    }
    next()
})

app.use('/api', router)

module.exports = app