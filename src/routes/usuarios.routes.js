import auth from "../controllers/usuario.controllers";              //importamos el middleware de autenticación
import express, { Router } from "express";
import usuarioCtrl from '../controllers/usuario.controllers';
import router from "./noticia.routes";


const route = Router();

const{crearUsuario, listarUsuario, eliminarUsuario, LoginUsuario} = usuarioCtrl;


router.route('/').post(crearUsuario).get(listarUsuario);
router.route('/:id').delete(eliminarUsuario);