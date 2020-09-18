import {Router} from 'express';
import categoriaCtrl from '../controllers/categoria.controllers'

const router = Router();

const {getActualidad } = categoriaCtrl;

router.route('/').get(getActualidad);


export default router;