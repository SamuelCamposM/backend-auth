const morgan = require("morgan");
const express = require("express");
const app = express();

//conectarse a la db
require("./config/databse");

//midllewares
app.use(morgan("dev"));
//leer datos json
//tienes que enviar el header como application-json
app.use(express.json({ extended: true }));
//router
app.use("/usuarios", require("./routes/usuarios"));
app.use("/auth", require("./routes/auth"));
//server
app.set("port", process.env.PORT || 4000);

const serverON = async () => {
  await app.listen(app.get("port"));
  console.log("server en el puerto ", app.get("port"));
};
serverON();
