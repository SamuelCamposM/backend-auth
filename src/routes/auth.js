//rutas para autenticar iniciaz sesion
//router
const router = require("express").Router();
//controlador
const { iniciarSesion } = require("../controllers/loginController");
//express validator
const { check } = require("express-validator");

//crea un usuario
router.post(
  "/",
  [
    check("password", "minimo 6 caracteres").isLength({ min: 6 }),
    check("email", "Agrega un email valido").isEmail(),
  ],
  iniciarSesion
);

module.exports = router;
