const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    event_name: String,
    merchant: String,
    terminal: String,
    status: Boolean,
    card_id: String,
    card_type: String,
    amount: String,
    currency: String,
    country: String,
    created: String
}, {
    collection: 'transaction'
})
module.exports = mongoose.model('Transaction', transactionSchema)