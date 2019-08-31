const mailConfig = require("./mailConfig");
nodeMailer = require("nodemailer");

const sendMail = (email, subject, html) => {
  return new Promise((resolve, reject) => {
    let transporter = nodeMailer.createTransport(mailConfig);
    let mailOptions = {
      to: email,
      subject: subject,
      html: html
    };
    transporter.sendMail(mailOptions, error => {
      if (error) {
        reject();
      } else {
        resolve();
      }
    });
  });
};

module.exports = sendMail;
