const express = require("express");

const {
  ServerConfig,
  BuyerQueue,
  AuthorQueue,
  RetailUserQueue,
} = require("./config");
const apiRoutes = require("./routes");
const CRON = require("./utils/common/cron-jobs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
  CRON();
  await BuyerQueue.connectQueue();
  await AuthorQueue.connectQueue();
  await RetailUserQueue.connectQueue();
  console.log("queues connected");
});
