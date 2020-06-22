//rutas para crear usuarios
//router
const router = require("express").Router();
//controlador
const { crearUsuario } = require("../controllers/usuarioController");
//express validator
const { check } = require("express-validator");

//crea un usuario
router.post(
  "/",
  [
      check("nombre", "El nombre es obligatorio").not().isEmpty(),
      check('email','Agrega un email valido').isEmail(),
      check('password','El password tiene que tener al menos 6 caracteres').isLength({min:6})
    ],
  crearUsuario
);

module.exports = router;
