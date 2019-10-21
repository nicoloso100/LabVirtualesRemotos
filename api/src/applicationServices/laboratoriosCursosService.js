//Models
const LaboratorioCurso = require("../models/laboratorioCurso");
//Constants
const laboratoriosCursosConstants = require("../constants/laboratoriosCursosConstants");

exports.addLaboratorioCurso = (idLaboratorio, idCurso) => {
  return new Promise((resolve, reject) => {
    const laboratorioCurso = new LaboratorioCurso({
      curso: idCurso,
      laboratorio: idLaboratorio
    });
    laboratorioCurso
      .save(null, { method: "insert" })
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(laboratoriosCursosConstants().addLabCursoError);
      });
  });
};
