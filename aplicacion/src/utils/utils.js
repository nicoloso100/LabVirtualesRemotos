//notifications
import { NotificationManager } from "react-notifications";

export const IsValidEmail = email => {
  // eslint-disable-next-line no-useless-escape
  var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(String(email).toLowerCase());
};

export const IsNotEmptyField = text => {
  return text !== "" ? true : false;
};

export const ShowNotification = notification => {
  switch (notification.type) {
    case "info":
      NotificationManager.info(notification.message);
      break;
    case "success":
      NotificationManager.success(notification.message);
      break;
    case "warning":
      NotificationManager.warning(notification.message);
      break;
    case "error":
      NotificationManager.error(notification.message);
      break;
    default:
      break;
  }
};

export const createMessageList = (list, message) => {
  let div = document.createElement("div");
  let span = document.createElement("span");
  span.innerHTML = message ? message : "";
  div.appendChild(span);
  let ul = document.createElement("ul");
  list.forEach(item => {
    let li = document.createElement("li");
    li.innerHTML = item;
    li.style.textAlign = "left";
    ul.appendChild(li);
  });
  div.appendChild(ul);
  return div;
};
