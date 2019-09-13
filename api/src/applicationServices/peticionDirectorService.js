//Models
const PeticionDirector = require("../models/peticionesDirector");
//Constants
const infoConstants = require("../constants/infoConstants");

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
            .save()
            .then(() => {
              resolve(infoConstants().OK);
            })
            .catch(err => {
              reject(infoConstants().error);
            });
        } else {
          reject(infoConstants().alreadyExists);
        }
      })
      .catch(err => {
        reject(infoConstants().searchError);
      });
  });
};
