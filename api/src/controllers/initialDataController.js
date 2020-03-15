//Constants
const generalConstants = require("../constants/generalConstants");
//Services
const usuarioService = require("../applicationServices/usuarioServices");

exports.get_initialData = (req, res) => {
	if (!req.body.email) {
		return res.status(500).send(generalConstants().missingFields);
	}

	usuarioService
		.getUsuario(req.body.email)
		.then(result => {
			return res.send(result);
		})
		.catch(err => {
			return res.status(500).send(err);
		});
};

exports.get_users = (req, res) => {
	usuarioService
		.getUsuariosList(req.body.rol, req.body.strict)
		.then(result => {
			return res.send(result);
		})
		.catch(err => {
			return res.status(500).send(err);
		});
};
