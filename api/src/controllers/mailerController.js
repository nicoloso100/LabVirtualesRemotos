nodeMailer = require("nodemailer");

exports.send_email = (req, res) => {
  var formulario = req.body;
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "pruebaclientepop@gmail.com",
      pass: "PruebaPop123"
    }
  });
  let mailOptions = {
    to: "nico.las0315@hotmail.com",
    subject: "PsApp: Nueva solicitud de contacto",
    html: `
    <!DOCTYPE html>
    <html>
    <body>
    
    <h1>Nueva solicitud de contacto:</h1>
    <p>Email: ${formulario.email}</p>
    <p>Nombre: ${formulario.nombre}</p>
    <p>Telefono: ${formulario.telefono}</p>
    
    </body>
    </html>
    `
  };
  transporter.sendMail(mailOptions, error => {
    if (error) {
      res.status(500).send("Ha ocurrido un error al enviar el formulario");
    } else {
      res.status(200).send("El correo se ha enviado satisfactoriamente");
    }
  });
};
