const Usuario = require("../models/usuario");
const initialDataConstats = require("../constants/initialDataConstats");

exports.get_initialData = (req, res) => {
  new Usuario()
    .where("email", req.body.email)
    .fetch({ withRelated: ["rol"] })
    .then(model => {
      let json = model.toJSON();
      return res.send({
        name: json.name,
        surname: json.surname,
        rol: json.rol.descripcion
      });
    })
    .catch(err => {
      return res.status(500).send(initialDataConstats().fetchError);
    });
};

exports.get_users = (req, res) => {
  new Usuario()
    .query(function(qb) {
      qb.select("email", "name", "surname", "rol");
    })
    .fetchAll({ withRelated: ["rol"] })
    .then(model => {
      return res.send(model.toJSON());
    })
    .catch(err => {
      return res.status(500).send(initialDataConstats().fetchError);
    });
};
