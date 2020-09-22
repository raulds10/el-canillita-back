
import express, { Router } from "express";
import usuarioCtrl from '../controllers/usuario.controllers';



const router = Router();

const{crearUsuario, listarUsuario, eliminarUsuario, LoginUsuario} = usuarioCtrl;


router.route('/').post(crearUsuario).get(listarUsuario);
router.route('/:id').delete(eliminarUsuario);
router.route('/loginUsuario').post(LoginUsuario);


export default router;