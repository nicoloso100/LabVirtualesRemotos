import { adminsURLs } from "../constants/URLs";
import swal from "sweetalert";
import { baseError } from "../constants/notificationConstanst";
import showLoading from "../components/loadingIcon/loading";
import { createMessageList } from "../utils/utils";

const axios = require("axios");

export const getAdmins = () => {
  showLoading(true);
  return new Promise(resolve => {
    axios
      .post(adminsURLs.getAdmins)
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

export const addAdmin = (email, setIsLoading) => {
  setIsLoading(true);
  return new Promise(resolve => {
    axios
      .post(adminsURLs.addAdmin, {
        email: email,
      })
      .then(res => {
        setIsLoading(false);
        resolve(res.data);
      })
      .catch(err => {
        setIsLoading(false);
        var error = err.response;
        swal("Oops!", error ? error.data : baseError, "warning");
      });
  });
};

export const deleteAdmin = emails => {
  showLoading(true);
  return new Promise(resolve => {
    let promises = [];
    let results = [];

    emails.forEach(email => {
      promises.push(
        axios.post(adminsURLs.deleteAdmin, {
          email: email,
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
