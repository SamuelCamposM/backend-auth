const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  console.log("crear usuario", req.body);
  const { email, password } = req.body;

  try {
    //validar que el usuario registrado sea unico
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    //crea el nuevo usuario
    usuario = new Usuario(req.body);

    //sifrar contraseña
    const salt = await bcrypt.genSalt(10);
    //sifrando la contraseña recibe 2 parametros el string que va a
    //sifrar y el salt (numero de vueltas)
    usuario.password = await bcrypt.hash(password, salt);
    //guardar el nuevo usuario
    await usuario.save();

    //creando y firmando el JWT

    const payload = {
      usuario: {
        id: usuario._id,
      },
    };

    //firmar token
    //recibe 3 parametros
    //el payload informacion que guarda el jwt
    //la palabra cecreta
    //la configuracion
    jwt.sign(
      payload,
      process.env.FIRMA,
      {
        expiresIn: 3600,
        //si hay error
      },
      (error, token) => {
          //valida si hay error o no si no hay envia el token
        if (error) throw error;

        //mensaje de confirmacion
        res.json({ token });
      }
    );

    //mensaje de confirmacion

  } catch (error) {
    console.log(error);
    res.status(400).send("No se pudo crear el usuario");
  }
};
