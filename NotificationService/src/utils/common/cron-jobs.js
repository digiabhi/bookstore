const cron = require("node-cron");

const { PurchaseService } = require("../../services");

function scheduleCrons() {
  cron.schedule("*/30 * * * *", async () => {
    await PurchaseService.cancelOldPurchases();
  });
}

module.exports = scheduleCrons;
