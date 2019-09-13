//Services
const mailService = require("../applicationServices/mailService");

exports.send_email = (req, res) => {
  mailService
    .sendMail(req.body)
    .then(response => {
      return res.send(response);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};
