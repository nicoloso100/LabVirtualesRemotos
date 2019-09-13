//Services
const peticionesDirectorService = require("../applicationServices/peticionDirectorService");

exports.send_info = (req, res) => {
  peticionesDirectorService
    .addPeticionesDirector(req.body)
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};
