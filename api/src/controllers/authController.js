const authConstants = require("../constants/authenticationConstants");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const sendMail = require("../utils/mailSender/mailSender");
const mailTemplate = require("../utils/mailSender/mailTemplate");
const uuid = require("uuid/v1");

exports.get_user = (req, res) => {
  return res.send(req.user);
};

exports.add_user = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(500).send(authConstants().missingFields);
  }
  new User({ email: req.body.email }).fetch().then(user => {
    if (user === null) {
      const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password
      });
      user
        .save()
        .then(() => {
          return res.send(authConstants().userCreated);
        })
        .catch(err => {
          return res.status(500).send(authConstants().errorUserCreate);
        });
    } else {
      return res.status(500).send(authConstants(req.body.email).userExists);
    }
  });
};

exports.get_token = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(500).send(authConstants().missingFields);
  }
  User.forge({ email: req.body.email })
    .fetch()
    .then(result => {
      if (!result) {
        return res
          .status(500)
          .send(authConstants(req.body.email).unregisteredEmail);
      }
      result
        .authenticate(req.body.password)
        .then(user => {
          const payload = { email: user.email };
          const token = jwt.sign(payload, process.env.SECRET_OR_KEY);
          res.json({
            token: token,
            name: result.attributes.name,
            email: result.attributes.email
          });
        })
        .catch(err => {
          return res.status(500).send(authConstants().wrongPassword);
        });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send(authConstants().systemError);
    });
};

exports.recover_password = (req, res) => {
  if (!req.body.email) {
    return res.status(500).send(authConstants().missingFields);
  }
  User.forge({ email: req.body.email })
    .fetch()
    .then(result => {
      if (!result) {
        return res
          .status(500)
          .send(authConstants(req.body.email).unregisteredEmail);
      }
      const newPassword = uuid().split("-")[0];
      result
        .where({ email: req.body.email })
        .save({ password: newPassword }, { method: "update" }, { patch: true })
        .then(() => {
          sendMail(
            req.body.email,
            authConstants().resetPasswordSubject,
            mailTemplate(
              result.attributes.name,
              authConstants().resetPasswordSubject,
              authConstants(newPassword).resetPasswordBody
            )
          )
            .then(() => {
              return res.send(authConstants().resetPassword);
            })
            .catch(() => {
              return res.status(500).send(authConstants().errorResetPassword);
            });
        })
        .catch(err => {
          return res.status(500).send(authConstants().errorResetPassword);
        });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send(authConstants().systemError);
    });
};
