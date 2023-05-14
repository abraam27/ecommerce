const express = require("express");
const router = express.Router();


const OrderController = require("../Controllers/OrderController");
// create order
router.post("/:userID",OrderController.CreateOrder)
// cancel order
router.delete("/:orderID",OrderController.CancelOrder);


module.exports = router;