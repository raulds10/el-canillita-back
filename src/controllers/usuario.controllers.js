import jwt from 'jsonwebtoken';
import usuario from "../models/usuario";

const auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')                //obtenemos el token del request header y dado que el token viene en un formato de Bearer[space]token, reemplazamos Bearer [space] con vacio ('')
    const data = jwt.verify(token, process.env.JWT_KEY)                             //verificar si el token recibido es válido o fue creado usando nuestra JWT_KEY
    try {
        const usuario = await usuario.findOne({ _id: data._id, 'tokens.token': token })   //ahora podemos encontrar un usuario con esa identificación y también si el token está en la matriz de tokens del usuario.
        if (!usuario) {
            throw new Error()
        }
        req.usuario = usuario                                                             //adjuntamos el usuario a nuestra solicitud
        req.token = token                                                           //hacemos lo mismo para el token
        next()                                                                      //next() para ir al siguiente middleware. Si no se llama a next(), la aplicación se congelaría en ese punto y no procedería a ejecutar el resto del código
    } catch (error) {
        res.status(401).send({ error: 'No está autorizado para acceder a este recurso' })
    }

}

export default auth
