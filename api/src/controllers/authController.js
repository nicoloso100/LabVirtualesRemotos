const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.get_user = (req, res) => {
  return res.send(req.user);
};

exports.add_user = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(500).send("Campos incompletos!");
  }

  new User({ username: req.body.username }).fetch().then(user => {
    if (user === null) {
      const user = new User({
        username: req.body.username,
        name: req.body.name,
        password: req.body.password
      });
      user.save().then(() => {
        res.send("El usuario se ha creado correctamente!");
      });
    } else {
      return res.status(500).send("El usuario ya existe!");
    }
  });
};

exports.get_token = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(500).send("Campos incompletos!");
  }
  User.forge({ username: req.body.username })
    .fetch()
    .then(result => {
      if (!result) {
        return res.status(500).send("El usuario ingresado no existe");
      }
      result
        .authenticate(req.body.password)
        .then(user => {
          const payload = { username: user.username };
          const token = jwt.sign(payload, process.env.SECRET_OR_KEY);
          res.json({ token: token, user: req.body.username });
        })
        .catch(err => {
          return res.status(500).send("La contraseña es incorrecta");
        });
    })
    .catch(err => {
      //console.log(err);
      return res
        .status(500)
        .send(
          "Nuestro sistema se encuentra en mantenimiento, vuelve a intentarlo más tarde"
        );
    });
};

exports.protected = (req, res) => {
  res.send("i'm protected");
};
