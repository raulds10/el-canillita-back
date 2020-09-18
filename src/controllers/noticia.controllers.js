import Noticia from '../models/noticia'

const noticiactrl = {};

noticiactrl.crearNoticia = async (req,res) => {
    console.log(req.body);
    try {
        const {tituloNoticia,resumen,detalle,imagen,imagen2,categoria,autor,fecha,principal} = req.body;
        const  noticiaNueva = new Noticia({
                 tituloNoticia,
                 resumen,
                 detalle,
                 imagen,
                 imagen2 ,
                 categoria,
                 autor,
                 fecha,
                 principal
        })
        await noticiaNueva.save();
        res.status(201).json({
            mensaje: "Noticia agregada exitosamente en  BD"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Ocurrio un error"
        })
    }
}

noticiactrl.listarNoticias = async (req,res) => {
    try {
        const listadoNoticias = await Noticia.find();
        res.status(200).json(listadoNoticias)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Ocurrio un error"
        })
    }
}

noticiactrl.eliminarNoticia = async (req,res) => {
    try {
        console.log(req.params.id);
        await Noticia.findByIdAndDelete(req.params.id);
        res.status(200).json({
            mensaje: "Noticia eliminada exitosamente"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Ocurrio un error"
        })
    }
}

noticiactrl.actualizarNoticia = async (req,res) => {
    try {
        await Noticia.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({
            mensaje: "Noticia actualizada exitosamente"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Ocurrio un error"
        })
    }
}

export default noticiactrl;