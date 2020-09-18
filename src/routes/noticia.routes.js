import {Router} from 'express';
import noticiactrl from '../controllers/noticia.controllers'
import categoriaCtrl from '../controllers/categoria.controllers'

const router = Router();

const {crearNoticia, listarNoticias, eliminarNoticia, actualizarNoticia,  } = noticiactrl;
const {getActualidad } = categoriaCtrl;

router.route('/actualidad').get(getActualidad);
router.route('/').get(listarNoticias).post(crearNoticia);
router.route('/:id').delete(eliminarNoticia).put(actualizarNoticia);


export default router;