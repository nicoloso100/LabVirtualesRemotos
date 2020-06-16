const body = document.body;
const container = document.createElement("div");
container.className = "loader";
container.style.backgroundColor = "rgba(124, 124, 124, 0.44)";
container.style.position = "fixed";
container.style.display = "flex";
container.style.top = "0";
container.style.zIndex = "100000";
container.style.width = "100%";
container.style.height = "100%";

const spinner = document.createElement("div");
spinner.className = "loaderSpinner";
container.appendChild(spinner);

/**
 * Pantalla de carga, esta pantalla ocupa todo el ancho y alto impidiendo que el usuario interactúe con la pantalla
 */
const showLoading = (loading) => {
  var imported = document.querySelector(".loader");
  if (loading && !document.body.contains(imported)) {
    body.appendChild(container);
  } else if (document.body.contains(imported)) {
    body.removeChild(imported);
  }
};

export default showLoading;
