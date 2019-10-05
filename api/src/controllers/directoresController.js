//Services
const directorService = require("../applicationServices/directorService");

exports.get_directores = (req, res) => {
  directorService
    .getDirectoresList(req.body.institucion)
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};
