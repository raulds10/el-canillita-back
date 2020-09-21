import {Router} from 'express';
import noticiactrl from '../controllers/noticia.controllers'

const router = Router();
const {crearNoticia, listarNoticias, eliminarNoticia, actualizarNoticia, listarNoticiasDeportes,
 listarNoticiasActualidad, listarNoticiasEspectaculos, listarNoticiasTecnologia, listarNoticiasPolitica,
 listarNoticiasEconomia, listarNoticiasSalud, listarNoticiasFotografia} = noticiactrl;

 //Rutas para cada categorias
router.route('/actualidad').get(listarNoticiasActualidad);
router.route('/deportes').get(listarNoticiasDeportes);
router.route('/espectaculos').get(listarNoticiasEspectaculos);
router.route('/tecnologia').get(listarNoticiasTecnologia);
router.route('/politica').get(listarNoticiasPolitica);
router.route('/economia').get(listarNoticiasEconomia);
router.route('/salud').get(listarNoticiasSalud);
router.route('/fotografia').get(listarNoticiasFotografia);

//Ruta principal
router.route('/:id').delete(eliminarNoticia).put(actualizarNoticia);
router.route('/').get(listarNoticias).post(crearNoticia);

export default router;