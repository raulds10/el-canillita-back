import express from 'express';
import morgan from "morgan";
import cors from 'cors';
import path from 'path';
import  usuario from './routes/usuarios.routes';
import noticiaRoutes from './routes/noticia.routes';
//import port from process.env.PORT

import "./database";

const PORT = 4004;
const app = express();
app.set( PORT || 4004);

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



app.use('/api/usuario', usuario);
app.use('/api/noticia', noticiaRoutes); 
