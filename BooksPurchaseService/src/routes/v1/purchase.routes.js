const express = require("express");

const { PurchaseController } = require("../../controllers");

const router = express.Router();

router.post("/", PurchaseController.purchaseBook);

router.post("/payments", PurchaseController.makePayment);

module.exports = router;
