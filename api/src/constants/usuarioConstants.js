const UsuarioConstants = param => {
	return {
		systemError: "Nuestro sistema se encuentra en mantenimiento, vuelve a intentarlo más tarde",
		wrongPassword: "La contraseña es incorrecta",
		unregisteredEmail: `El correo ${param} no está registrado`,
		missingFields: "Campos incompletos!",
		userExists: `El usuario ${param} ya existe!`,
		userCreated: "El usuario se ha creado correctamente!",
		errorUserCreate: "Ha ocurrido un error al crear el usuario, inténtalo más tarde",
		criticalErrorUserCreate: "Ha ocurrido un error al crear el usuario, por favor comuníquese con un administrador",
		resetPassword: "Hemos enviado a su correo una nueva contraseña",
		errorResetPassword: "Ha ocurrido un error al generar una nueva contraseña, inténtalo más tarde",
		resetPasswordSubject: "Se ha solicitado la recuperación de la contraseña",
		resetPasswordBody: `te hemos generado una nueva contraseña para que puedas acceder a la plataforma.<br /><br /> Tu nueva contraseña es: "${param}"<br /><br />(Sin comillas)`,
		getUsuarioError: "No se ha podido obtener la información del usuario",
		getUsuariosListError: "No se ha podido obtener la lista de los usuarios",
		noRol: "No se ha podido obtener el rol del usuario, por favor intenta más tarde"
	};
};

module.exports = UsuarioConstants;
