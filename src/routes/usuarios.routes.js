import auth from "../controllers/usuario.controllers";              //importamos el middleware de autenticación
import express from "express";
import usuario from "../models/usuario";

/*

const userRoutes = {};
userRoutes.RegisterUser = async (req, res) => {
    const { body } = req
    let nombre = ({ nombre: body.nombre })
    let email = ({ email: body.email })
    let mailExists = await usuario.findOne({ email: body.email });
    if (mailExists) {
        console.log(mailExists)
        return res.status(400).json({ mensaje: 'El mail ya se encuentra en uso' })
    }
    const user = {
        nombre: body.nombre,
        email: body.email,
        token: []
    };
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(body.password, salt);
    const usuario = new usuario(user);
    try {
        await usuario.save();
        res.send({ mensaje: 'Tu Usuario se Registro Correctamente' })
    } catch (error) {
        res.status(500).send(error);
    }
}
userRoutes.GetUsers = async (req, res) => {
    try {
        const getUsers = await usuario.find({});
        res.status(200).json(getUsers)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Ocurrio un error"
        })
    }
}
userRoutes.LoginUser = async (req, res) => {
    const { body } = req
    const userLogin = await usuario.findOne({ email: body.email });
    console.log('userLogin', userLogin)
    if (!userLogin) {
        return res.status(400).json({ mensaje: 'Usuario y/o Contraseña Incorrectos' })
    }
    const passCheck = await bcryptjs.compare(body.password, userLogin.password);
    if (!passCheck) {
        return res.status(400).json({ mensaje: 'Usuario y/o Contraseña Incorrectos' })
    }
    const jwt_payload = {
        user: {
            id: userLogin._id,
            email: userLogin.email,
            roleType: userLogin.roleType
        }
    }
    console.log(jwt_payload)
    try {
        const token = jwt.sign(jwt_payload, process.env.JWT_SECRET, { expiresIn: process.env.TIME_EXP })
        userLogin.token = [token]
        await usuario.update({ email: userLogin.email }, userLogin)
        res.send({ mensaje: 'Logueado Correctamente', token, roleType: userLogin.roleType, id: userLogin._id })
    } catch (error) {
        return res.status(500).json({ mensaje: 'ERROR', error })
    }
}
export default userRoutes;
*/














const router = {};

router.post('/usuario', async (req, res) => {
                                                                     // Crear nuevo usuario
    try {
        const usuario = new Usuario(req.body)                 // crea un nuevo usuario junto con la información de usuario suministrada a la que accedemos desde req.body
        await usuario.save()                               // guarda e usuario
        const token = await usuario.generateAuthToken()    //generamos un token de autenticación
        res.status(201).send({ usuario, token })           //lo devolvemos (el token) como respuesta junto con los datos del usuario
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('usuario/login', async(req, res) => {
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

router.get('/usuario/me', auth, async(req, res) => {      //router para obtener el perfil de usuario -> solicitud al endpoint /users/me
    // Ver el profile del usuario logeado               
    res.send(req.usuario)                                  //obtengo el perfil de usuario de la solicitud
})


router.post('/usuario/me/logout', auth, async (req, res) => {
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

router.post('/usuario/me/logoutall', auth, async(req, res) => {
    // Logout del usuario de todos los dispositivos
    try {
        req.usuario.tokens.splice(0, req.usuario.tokens.length)
        await req.usuario.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})


export default router;