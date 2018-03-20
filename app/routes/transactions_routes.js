const ObjectID = require('mongodb').ObjectId
const TRANSACTIONS_COLLECTION = "transaction"

// Generic for now to handle errors, used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ "error": message });
}

module.exports = function(app, db) {
    /*  "/api/transactions"
     *    GET: finds all transactions
     *    POST: no post requests allowed for now
     */
    app.get("/api/transactions", (req, res) => {
        db.collection(TRANSACTIONS_COLLECTION).find({}).toArray((err, transactions) => {
            if (err) {
                handleError(res, err.message, "Failed to get transactions..")
            } else {
                res.status(200).json(transactions)
            }
        })
    })

    /* "/api/events/:name"
     *
     *   GET: find event's transactions by exact event_name
     *  
     */
    app.get("/api/events/:name", (req, res) => {
        let event_name = req.params.name
        db.collection(TRANSACTIONS_COLLECTION).find({
                "event_name": event_name
            })
            .toArray((err, events) => {
                if (err) {
                    handleError(res, err.message, "Failed to get transactions..")
                } else {
                    if (events.length > 0) {
                        res.status(200).json(events)
                    } else {
                        handleError(res, '', "Something went wrong", 400)
                    }
                }
            })
    })
};