const transactionsRoutes = require('./transactions_routes');

module.exports = function(app, db) {
    transactionsRoutes(app, db);
}