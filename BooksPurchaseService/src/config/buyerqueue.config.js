const amqplib = require("amqplib");

let channel, connection;

// Connect to the queue
async function connectQueue() {
  try {
    connection = await amqplib.connect("amqp://localhost");
    channel = await connection.createChannel();

    await channel.assertQueue("buyer-noti-queue");
  } catch (error) {
    console.log(error);
  }
}

// Send data to the queue
async function sendData(data) {
  try {
    await channel.sendToQueue(
      "buyer-noti-queue",
      Buffer.from(JSON.stringify(data))
    );
  } catch (error) {
    console.log("queue error", error);
  }
}

module.exports = {
  connectQueue,
  sendData,
};
