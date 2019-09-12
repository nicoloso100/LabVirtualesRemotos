const adminsController = require("../controllers/");

exports.deleteVisitante = email => {
  return new Promise((resolve, reject) => {
    new Administrador()
      .fetchAll({
        withRelated: [
          {
            usuario: function(qb) {
              qb.select("email", "name", "surname");
            }
          }
        ]
      })
      .then(admins => {
        res.send(admins.toJSON());
      })
      .catch(err => {
        console.log(err);
      });
  });
};
