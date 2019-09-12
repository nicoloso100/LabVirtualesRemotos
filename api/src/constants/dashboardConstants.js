const DashboardConstants = param => {
  return {
    fetchError: "Se ha presentado una falla, por favor intenta más tarde",
    noRol:
      "No se ha podido obtener el rol del usuario, por favor intenta más tarde",
    labsError:
      "No se ha podido obtener la información del laboratorio, contacte con un administrador"
  };
};

module.exports = DashboardConstants;
