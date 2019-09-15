//Services
const peticionDirectorServices = require("../applicationServices/peticionDirectorServices");

exports.get_peticiones = (req, res) => {
  peticionDirectorServices
    .getPeticiones()
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};
