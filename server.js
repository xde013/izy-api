const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const config = require('./config');

const app = express();

const port = 8000;

app.use(bodyParser.json());
/* Allow Cross Origin Resource Sharing */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// process.env.MONGODB_URI or db.url
MongoClient.connect(config.url, function(err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    // Use database object as the callback 
    require('./app/routes')(app, database);
    console.log("Database connection ready");

    // Initialize the app.
    var server = app.listen(process.env.PORT || 8080, () => {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});