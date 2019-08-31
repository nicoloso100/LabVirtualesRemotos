const MailConstants = param => {
  return {
    subject: "Bienvenido a Laboratorios virtuales y remotos",
    sentSuccess: "El correo se ha enviado satisfactoriamente",
    sentError: "Ha ocurrido un error al enviar el correo"
  };
};

module.exports = MailConstants;
