import express from 'express';
import morgan from "morgan";
import cors from 'cors';
import path from 'path';
import  usuario from './models/usuario';
//import port from process.env.PORT

import "./database";

const PORT = 4005;
const app = express();
app.set( PORT || 4005);

app.listen(PORT, () => {
    console.log(path.join(__dirname, "../public"));
    console.log(`estoy escuchando el puerto ${PORT}`);
})

//middlewares
app.use(morgan('dev'));
app.use(cors());

app.use(express.json()); 
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "../public")))

//ruta 
app.get('/noticia', (req, res) => {
       res.send("hola pepe :) ")
});

app.get('/usuarios', (req,res) => {
    res.send("estoy en la pagina de usuarios");
    
})

app.get('/categoria', (req,res) => {
    res.send("estoy en la pagina de categoria");
    
})



/*app.post('/api/usuario/registro', (req,res) => {
    const usuario = new Usuario(req.body)
    usuario.save((err,doc) => {
        if(err) return res.json({
            success: false, err
        })
        res.status(200).json({
            success: true,
            userdata: doc
        })
    })
})*/

app.use('/api/diario', usuario);