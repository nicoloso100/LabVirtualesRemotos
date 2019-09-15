//Models
const PeticionDirector = require("../models/peticionesDirector");
//Constants
const peticionesDirectorConstants = require("../constants/peticionesDirectorConstants");

exports.getPeticiones = () => {
  return new Promise((resolve, reject) => {
    PeticionDirector.fetchAll({
      withRelated: [
        {
          visitante: function(qb) {
            qb.select("email");
          },
          "visitante.usuario": function(qb) {
            qb.select("email", "name", "surname");
          }
        }
      ]
    })
      .then(model => {
        resolve(model.toJSON());
      })
      .catch(err => {
        console.log(err);
        reject(peticionesDirectorConstants().getAllError);
      });
  });
};

exports.addPeticionesDirector = params => {
  return new Promise((resolve, reject) => {
    PeticionDirector.where("email", params.email)
      .fetch()
      .then(peticion => {
        if (peticion === null) {
          const peticionDirector = new PeticionDirector({
            email: params.email,
            institucion: params.institucion,
            mensaje: params.mensaje
          });
          peticionDirector
            .save(null, { method: "insert" })
            .then(() => {
              resolve(peticionesDirectorConstants().OK);
            })
            .catch(err => {
              console.log(err);
              reject(peticionesDirectorConstants().error);
            });
        } else {
          reject(peticionesDirectorConstants().alreadyExists);
        }
      })
      .catch(err => {
        reject(peticionesDirectorConstants().searchError);
      });
  });
};

exports.deletePeticionDirector = email => {
  return new Promise((resolve, reject) => {
    PeticionDirector.where("email", email)
      .fetch()
      .then(peticion => {
        if (peticion !== null) {
          peticion
            .destroy()
            .then(() => {
              resolve(peticionesDirectorConstants().deleteOk);
            })
            .catch(err => {
              reject(peticionesDirectorConstants().deleteError);
            });
        } else {
          resolve(peticionesDirectorConstants().noPeticiones);
        }
      })
      .catch(err => {
        reject(peticionesDirectorConstants().searchError);
      });
  });
};
