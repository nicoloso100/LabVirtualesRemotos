const mailConstants = require("../constants/emailConstants");
const mailTemplate = require("../utils/mailSender/mailTemplate");
const sendMail = require("../utils/mailSender/mailSender");

exports.send_email = (req, res) => {
  const { email, name, title, text } = req.body;
  sendMail(email, mailConstants().subject, mailTemplate(name, title, text))
    .then(() => {
      res.status(200).send(mailConstants().sentSuccess);
    })
    .catch(() => {
      res.status(500).send(mailConstants().sentError);
    });
};
