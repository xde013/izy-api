const express = require("express")
const router = express.Router()
const transactionController = require('../controllers/Transaction')


router.get("/transactions", transactionController.all)
router.get("/events/:name", transactionController.show)
router.get("/top/:limit", transactionController.top)

module.exports = router