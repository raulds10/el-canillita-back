import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario';
import bcryptjs from 'bcryptjs';


const usuarioCtrl = {};


usuarioCtrl.crearUsuario = async (req,res) => {
    console.log(req.body);
    try{
    const {nombreUsuario, apellidoUsuario, direccionUsuario, localidadUsuario, codigoPostal, telefonoUsuario, emailUsuario,
        roleUsuario, contraseñaUsuario} = req.body;

        const usuarioNuevo = new Usuario({
            nombreUsuario,
            apellidoUsuario,
            direccionUsuario,
            localidadUsuario,
            codigoPostal,
            telefonoUsuario,
            emailUsuario,
            roleUsuario,
            contraseñaUsuario
            
        });
       // console.log(req.body.contraseñaUsuario);
       const salt = await bcryptjs.genSalt(10);
        Usuario.contraseñaUsuario = await bcryptjs.hash(req.body.contraseñaUsuario, salt);
    
        await usuarioNuevo.save();
        res.status(201).json({
            mensaje: "Usuario agregado exitosamente en  BD"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Ocurrio un error"
        })
    }
    }


    usuarioCtrl.listarUsuario = async (req, res) => {
        try{
            const listadoUsuario = await Usuario.find();
            res.status(200).json(listadoUsuario)
        }catch(error){
            console.log(error);
            res.status(500).json({
                mensaje: "Ocurrio un error"
            })
        }
    }


    usuarioCtrl.eliminarUsuario = async (req,res) => {
        try {
            console.log(req.params.id);
            await Usuario.findByIdAndDelete(req.params.id);
            res.status(200).json({
                mensaje: "Usuario eliminado exitosamente"
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                mensaje: "Ocurrio un error"
            })
        }
    }


    usuarioCtrl.LoginUsuario = async (req, res) => {
        const { body } = req
        const usuarioLogueado = await Usuario.findOne({ email: body.email });
        console.log('usuarioLogueado', usuarioLogueado)
        if (!usuarioLogueado) {
            return res.status(400).json({ mensaje: 'Usuario y/o Contraseña Incorrectos' })
        }
        const passCheck = await bcryptjs.compare(body.password, usuarioLogueado.password);
        if (!passCheck) {
            return res.status(400).json({ mensaje: 'Usuario y/o Contraseña Incorrectos' })
        }
        const jwt_payload = {
            user: {
                id: usuarioLogueado._id,
                email: usuarioLogueado.email,
                roleUsuario: usuarioLogueado.roleUsuario
            }
        }
        console.log(jwt_payload)
        try {
            const token = jwt.sign(jwt_payload, process.env.JWT_SECRET, { expiresIn: process.env.TIME_EXP })
            usuarioLogueado.token = [token]
            await Usuario.update({ email: usuarioLogueado.email }, usuarioLogueado)
            res.send({ mensaje: 'Logueado Correctamente', token, roleUsuario: usuarioLogueado.roleUsuario, id: usuarioLogueado._id })
        } catch (error) {
            return res.status(500).json({ mensaje: 'ERROR', error })
        }
    }


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


    




  /*  module.exports = (role) => async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const verificar = jsonwebtoken.verify(token, process.env.JWT_SECRET);
            const userLogin = await UsersModel.findOne({ _id: verificar.user.id, token: token });
            if (!userLogin) {
                return res.status(401).json({ mensaje: 'Dentro: No Autorizado' })
            }
            if (typeof role === 'string' && verificar.user.role !== role) {
                return res.status(401).json({ mensaje: 'Dentro: No Autorizado' })
            } else if (Array.isArray(role) && !role.includes(verificar.user.role)) {
                return res.status(401).json({ mensaje: 'Dentro: No Autorizado' })
            }
            res.locals.user = userLogin;
            res.locals.token = token;
            next();
        }
        catch (error) {
            return res.status(401).json({ mensaje: 'Fuera: No Autorizado', error: error.message })
        }
    }*/

 /*  





/*

usuarioCtrl.post('usuario/login', async(req, res) => {
    //Inicia sesión de un usuario registrado
    try {
        const { email, password } = req.body
        const usuario = await Usuario.findByCredentials(email, password)
        if (!usuario) {
            return res.status(401).send({error: 'Registro incorrecto! '})
        }
        const token = await usuario.generateAuthToken()
        res.send({ usuario, token })
    } catch (error) {
        res.status(400).send(error)
    }

})

usuarioCtrl.get('/usuario/me', auth, async(req, res) => {      //usuarioCtrl para obtener el perfil de usuario -> solicitud al endpoint /users/me
    // Ver el profile del usuario logeado               
    res.send(req.usuario)                                  //obtengo el perfil de usuario de la solicitud
})


usuarioCtrl.post('/usuario/me/logout', auth, async (req, res) => {
                                                                          // Logout del usuario de la aplicación
    try {
        req.usuario.tokens = req.usuario.tokens.filter((token) => {   // filtramos la matriz de tokens del usuario -> 
            return token.token != req.token                     // devolvemos true si alguno de los tokens no es igual al token que utilizó el usuario para iniciar sesión -> El arreglo filter method crea una nuevo arreglo con todos los elementos que pasan la prueba implementada. En nuestro caso anterior, el método de filtro devolverá un nuevo arreglo que contiene cualquier otro token aparte del que se usó para iniciar sesión
        })
        await req.usuario.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

usuarioCtrl.post('/usuario/me/logoutall', auth, async(req, res) => {
    // Logout del usuario de todos los dispositivos
    try {
        req.usuario.tokens.splice(0, req.usuario.tokens.length)
        await req.usuario.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})







*/
export default usuarioCtrl;



