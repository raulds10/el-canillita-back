import {Router} from 'express';
import noticiactrl from '../controllers/noticia.controllers'

const router = Router();

const {crearNoticia, listarNoticias, eliminarNoticia, actualizarNoticia } = noticiactrl;

router.route('/').get(listarNoticias).post(crearNoticia);
router.route('/:id').delete(eliminarNoticia).put(actualizarNoticia);

export default router