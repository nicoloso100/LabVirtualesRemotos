//Constants
const generalConstants = require("../constants/generalConstants");
//Services
const peticionesDirectorService = require("../applicationServices/peticionDirectorServices");

exports.send_info = (req, res) => {
  if (!req.body.email || !req.body.institucion || !req.body.mensaje) {
    return res.status(500).send(generalConstants().missingFields);
  }

  peticionesDirectorService
    .addPeticionesDirector(req.body)
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};
