const express = require('express')
const app = require('./app')
const port = 8000

const server = app.listen(process.env.PORT || 8080, () => {
    let port = server.address().port
    console.log("App now running on port", port)
})