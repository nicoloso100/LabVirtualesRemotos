import { cursosURLs } from "../constants/URLs";
import swal from "sweetalert";
import { baseError } from "../constants/notificationConstanst";
import showLoading from "../components/loadingIcon/loading";
import { createMessageList } from "../utils/utils";

const axios = require("axios");

export const getCursos = email => {
  showLoading(true);
  return new Promise(resolve => {
    axios
      .post(cursosURLs.getCursos, { profesor: email })
      .then(res => {
        showLoading(false);
        resolve(res);
      })
      .catch(err => {
        showLoading(false);
        var error = err.response;
        swal("Oops!", error ? error.data : baseError, "warning");
      });
  });
};

export const getCursosEstudiantes = email => {
  showLoading(true);
  return new Promise(resolve => {
    axios
      .post(cursosURLs.getCursosEstudiantes, { profesor: email })
      .then(res => {
        showLoading(false);
        resolve(res);
      })
      .catch(err => {
        showLoading(false);
        var error = err.response;
        swal("Oops!", error ? error.data : baseError, "warning");
      });
  });
};

export const saveCurso = newCurso => {
  showLoading(true);
  return new Promise(resolve => {
    axios
      .post(cursosURLs.saveCurso, newCurso)
      .then(res => {
        showLoading(false);
        swal("Ok!", res.data, "success");
        resolve();
      })
      .catch(err => {
        showLoading(false);
        var error = err.response;
        swal("Oops!", error ? error.data : baseError, "warning");
      });
  });
};

export const editCurso = newCurso => {
  showLoading(true);
  return new Promise(resolve => {
    axios
      .post(cursosURLs.editCurso, newCurso)
      .then(res => {
        showLoading(false);
        swal("Ok!", res.data, "success");
        resolve();
      })
      .catch(err => {
        showLoading(false);
        var error = err.response;
        swal("Oops!", error ? error.data : baseError, "warning");
      });
  });
};

export const deleteCurso = idCurso => {
  showLoading(true);
  return new Promise(resolve => {
    axios
      .post(cursosURLs.deleteCurso, { idCurso: idCurso })
      .then(res => {
        showLoading(false);
        swal("Ok!", res.data, "success");
        resolve();
      })
      .catch(err => {
        showLoading(false);
        var error = err.response;
        swal("Oops!", error ? error.data : baseError, "warning");
      });
  });
};

export const saveCursoEstudiante = newEstudiante => {
  showLoading(true);
  return new Promise(resolve => {
    axios
      .post(cursosURLs.addEstudianteACurso, newEstudiante)
      .then(res => {
        showLoading(false);
        resolve(res.data);
      })
      .catch(err => {
        showLoading(false);
        var error = err.response;
        swal("Oops!", error ? error.data : baseError, "warning");
      });
  });
};

export const deleteCursoEstudiante = (alumnosList, idCurso) => {
  showLoading(true);
  return new Promise(resolve => {
    let promises = [];
    let results = [];

    alumnosList.forEach(email => {
      promises.push(
        axios.post(cursosURLs.deleteEstudianteACurso, {
          emailAlumno: email,
          idCurso: idCurso,
        }),
      );
    });

    axios
      .all(promises)
      .then(res => {
        res.forEach(result => {
          results.push(result.data);
        });
        showLoading(false);
        swal({
          title: "Resultado de la operación:",
          content: createMessageList(results),
          type: "success",
          icon: "success",
        });
        resolve();
      })
      .catch(err => {
        showLoading(false);
        var error = err.response;
        swal("Oops!", error ? error.data : baseError, "warning");
      });
  });
};
