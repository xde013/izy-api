const TRANSACTIONS_COLLECTION = "transaction"
const TRANSACTION_COUNT = 1000
const Transaction = require('../models/transaction')

// Generic for now to handle errors, used by all endpoints.
const handleError = (res, reason, message, code) => {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ "error": message })
}

/*  "/api/transactions"
 *   GET: finds all transactions
 *   POST: no post requests allowed for now
 */
exports.all = function(req, res) {
    Transaction.find({}).exec((err, transactions) => {
        err ? handleError(res, err.message, "Failed to get transactions..") : res.status(200).json(transactions)
    })
}

/* "/api/events/:name"
 *
 *   GET: find event's transactions by exact event_name
 *  
 */
exports.show = function(req, res) {
    let event_name = req.params.name
    Transaction.find({
        "event_name": event_name
    }).exec((err, events) => {
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
}

/*  "/api/top/:limit"
 *
 *  GET: Top events sorted by total number of transactions in desc order
 *  @limit: size of event list ouputed
 *  
 */
exports.top = function(req, res) {
    let limit = parseInt(req.params.limit)
    if (limit > 0 && limit <= TRANSACTION_COUNT) {
        Transaction.aggregate([{
                // Use group operator
                "$group": {
                    // Point group key to the unique event name
                    "_id": "$event_name",
                    // Will add 1 for each matched event
                    "total": { "$sum": 1 }
                }
            },
            // Sort in desc order
            { $sort: { total: -1 } },
            // Set limit
            { $limit: limit }
        ]).exec((err, events) => {
            err ? handleError(res, err.message, "Failed to get TOP" + limit) : res.status(200).json(events)
        })
    } else {
        handleError(res, '', "Something went wrong", 400)
    }
}