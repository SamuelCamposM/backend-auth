const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.iniciarSesion = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  console.log("login usuario", req.body);
  const { email, password } = req.body;

  try {
    //revisa si el usuario ya esta registrado
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }
    //recive 2 parametros
    //el campo que comparara del req.body
    //y el del usuario que esta almacenado en la db
    const passwordDescifrado = await bcrypt.compare(password, usuario.password);
    if (!passwordDescifrado) {
      //podrias poner contraseña o correo equivocados
      //para que no se entere de si ese correo existe o no
      return res.status(400).json({ msg: "password Incorrecto" });
    }

    //si el el usuario existe y si la contraseña es la misma
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
  }
};

//obtiene que usuario esta autenticado
exports.usuarioAutenticado= async (req,res)=> {
  try {
  const user = await Usuario.findOne({id: req.usuario.id })
  res.json({usuario})
  } catch (error) {
    console.log(error);
  res.status(500).json({msg:'hubo un error'})
  }
}