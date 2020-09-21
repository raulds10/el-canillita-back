import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



const usuarioSchema = new Schema({
  nombreUsuario: {
    type: String,
    maxlength: 100,
    required: true
  },
  apellidoUsuario:{
    type: String,
    maxlength: 100,
    required: true
  },
  direccionUsuario:{
    type: String,
    maxlength: 100,
    required: true
  },
  localidadUsuario:{
    type: String,
    maxlength: 100,
    required: true
  },
  codigoPostal:{
    type: Number,
    maxlength: 5,
    required: true
  },
  telefonoUsuario:{
    type: String,
    maxlength: 10,
    required: true
  },
  emailUsuario:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => {
       if (!validator.isEmail(value)) {
          throw new Error({error: 'Invalid Email address'})
       }
    }
 },
  roleUsuario:{
      type: Number,
      default: 0
  },
  contraseñaUsuario:{
    type: String,
    required: true,
    maxlength: 30,
    minlength: 5
  },
  tokens: [{
    token: {
       type: String,
       required: true
    }
}]
});

usuarioSchema.pre('save', async function (next) {                      // nos permite hacer algo antes de guardar el objeto creado
                                                                  // Encriptar el password antes de guardarlo en el model user
  const usuario = this
  if (usuario.isModified('password')) {
      usuario.password = await bcrypt.hash(usuario.password, 8)         //usamos bcrypt para encriptar la contraseña
  }                                                               // asegurarnos de que solo usemos hash de la contraseña si se modifica
  next()                                                          //  y es por eso que primero tenemos que verificar si la contraseña se modificó.
});

usuarioSchema.methods.generateAuthToken = async function() {
  // Generar un método de autenticación para el usuario
  const usuario = this
  const token = jwt.sign({_id: usuario._id}, process.env.JWT_KEY)    //Este método utiliza el JWT para firmar el método para crear un token. El método firmado espera los datos que se utilizarán para firmar el token y una clave JWT que puede ser una cadena aleatoria. Para nuestro caso, definimos uno en el archivo .env y lo llamamos JWT_KEY.
  usuario.tokens = usuario.tokens.concat({token})                       //Una vez creado el token, lo agregamos a la lista de tokens del usuario
  await usuario.save()                                               //guardamos
  return token                                                    //devolvemos el token
}

usuarioSchema.statics.findByCredentials = async (email, password) => { 
 
  const usuario = await usuario.findOne({ email} )                              
  if (!usuario) {                                                             
      throw new Error({ error: 'Alguno de los datos ingresados no son válidos' })       
  }
  const isPasswordMatch = await bcrypt.compare(password, usuario.password)   
  if (!isPasswordMatch) {                             
      throw new Error({ error: 'Alguno de los datos ingresados no son válidos' })
  }
  return usuario
}


const Usuario = mongoose.model('usuario', usuarioSchema);
export default Usuario;
