//Utils
const mailTemplate = require("../utils/mailSender/mailTemplate");
const sendMail = require("../utils/mailSender/mailSender");
//Constants
const mailConstants = require("../constants/emailConstants");

exports.sendMail = (email, subject, name, text) => {
  return new Promise((resolve, reject) => {
    sendMail(email, subject, mailTemplate(name, subject, text))
      .then(() => {
        resolve(mailConstants().sentSuccess);
      })
      .catch(() => {
        reject(mailConstants().sentError);
      });
  });
};
