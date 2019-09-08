const User = require("../models/usuario");
const initialDataConstats = require("../constants/initialDataConstats");

exports.get_initialData = (req, res) => {
  new User()
    .where("email", req.body.email)
    .fetch({ withRelated: ["roles"] })
    .then(model => {
      let json = model.toJSON();
      return res.send({
        name: json.name,
        surname: json.surname,
        rol: json.roles.descripcion
      });
    })
    .catch(err => {
      return res.status(500).send(initialDataConstats().fetchError);
    });
};
