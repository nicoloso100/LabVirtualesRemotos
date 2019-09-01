var body = document.body;
var container = document.createElement("div");
container.style.backgroundColor = "rgba(124, 124, 124, 0.44)";
container.style.position = "fixed";
container.style.display = "flex";
container.style.top = "0";
container.style.zIndex = "100000";
container.style.width = "100%";
container.style.height = "100%";

var spinner = document.createElement("div");
spinner.className = "loaderSpinner";
container.appendChild(spinner);

const showLoading = loading => {
  if (loading) {
    body.appendChild(container);
  } else {
    body.removeChild(container);
  }
};

export default showLoading;
