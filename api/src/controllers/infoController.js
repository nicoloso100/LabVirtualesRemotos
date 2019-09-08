const PeticionDirector = require("../models/peticionesDirector");
const infoConstants = require("../constants/infoConstants");

exports.send_info = (req, res) => {
  const { email, institucion, mensaje } = req.body;

  PeticionDirector.where("email", email)
    .fetch()
    .then(peticion => {
      if (peticion === null) {
        const peticionDirector = new PeticionDirector({
          email: email,
          institucion: institucion,
          mensaje: mensaje
        });
        peticionDirector
          .save()
          .then(() => {
            return res.send(infoConstants().OK);
          })
          .catch(err => {
            return res.status(500).send(infoConstants().error);
          });
      } else {
        return res.status(500).send(infoConstants().alreadyExists);
      }
    })
    .catch(err => {
      return res.status(500).send(infoConstants().searchError);
    });
};
