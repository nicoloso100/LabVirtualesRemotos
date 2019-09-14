//Constants
const generalConstants = require("../constants/generalConstants");
//Services
const emailService = require("../applicationServices/emailServices");

exports.send_email = (req, res) => {
  const { email, subject, name, text } = req.body;
  if (!email || !subject || !name || !text) {
    return res.status(500).send(generalConstants().missingFields);
  }

  emailService
    .sendMail(email, subject, name, text)
    .then(response => {
      return res.send(response);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};
