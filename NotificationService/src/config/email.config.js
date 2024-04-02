const nodemailer = require("nodemailer");

const { GMAIL_EMAIL, GMAIL_PASS } = require("./server.config");

// Create a transporter object
const mailsender = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_PASS,
  },
});

module.exports = mailsender;
