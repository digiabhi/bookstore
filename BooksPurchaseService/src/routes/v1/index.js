const express = require("express");

const { InfoController } = require("../../controllers");

const purchaseRoutes = require("./purchase.routes");

const router = express.Router();

router.get("/info", InfoController.info);

router.use("/purchases", purchaseRoutes);

module.exports = router;
