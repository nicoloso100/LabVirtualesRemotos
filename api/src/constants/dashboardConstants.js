const DashboardConstants = param => {
  return {
    fetchError: "Se ha presentado una falla, por favor intenta más tarde",
    noRol:
      "No se ha podido obtener el rol del usuario, por favor intenta más tarde",
    visitanteError:
      "No se ha podido obtener la información del visitante, porfavor contáctese con un administrador para reajustar el rol"
  };
};

module.exports = DashboardConstants;
