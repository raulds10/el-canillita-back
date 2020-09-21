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
      type: String,
      
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


const Usuario = mongoose.model('usuario', usuarioSchema);
export default Usuario;
