const { BookSoldRepository } = require("../repositories");
const { Mailer } = require("../config");

const booksoldRepo = new BookSoldRepository();

async function sendEmail(mailFrom, mailTo, subject, text) {
  try {
    const response = await Mailer.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: subject,
      text: text,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function createNotification(data) {
  try {
    const response = await booksoldRepo.create(data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getPendingEmails() {
  try {
    const response = await booksoldRepo.getPendingTickets();
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  sendEmail,
  createNotification,
  getPendingEmails,
};
