import Noticia from '../models/noticia';

const categoriaCtrl = {};

categoriaCtrl.getActualidad = async (req, res) => {
    try {
        const  traerActualidad = await  Noticia.find({})
        res.send(traerActualidad);
    } catch (error) {
        res.status(500).send({
            mensaje: 'ocurrio un error', error
        })
    }
}
export default categoriaCtrl;

// const NewsPaper = require('../models/noticia');
// exports.GetDeportes =  async (req, res) => {
//     const newpaper = await NewsPaper.find({categoria: 'actualidad'})
//     try {
//         res.send(newpaper)
//     } catch (err) {
//         res.status(500).send(err);
//     }
// } 