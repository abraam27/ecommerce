const express = require("express");
const router = express.Router();
const PaymentController = require("../Controllers/PaymentController");

router.post("/", PaymentController.createPayment);

module.exports = router;
