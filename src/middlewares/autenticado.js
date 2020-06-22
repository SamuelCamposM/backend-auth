const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    
    //leer el token del header
const token = req.header('x-auth-token')
console.log(token);

    //revisar si hay token
if (!token) {
    return res.status(401).json({msg: 'No hay token , permiso no valido'})
    }
    
    //validar si hay token
    try {
        const cifrado = jwt.verify(token , process.env.FIRMA)
        //estoy agregando el id (req.usuario)
        //para poder usar ese id y ll,arlo como (req.usuario.id )
        //ya que ese es el payload que le pone el token al usuario
        req.usuario = cifrado.usuario;
        next()
    } catch (error) {
        res.status(401).json({msg: 'Token no valido'})
    }
}