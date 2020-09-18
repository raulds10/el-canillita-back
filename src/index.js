import express from "express";
import morgan from "morgan";
import cors from 'cors';
import path from 'path';

import "./database";
const app = express();
app.set('port', process.env.PORT || 4005)

app.listen(app.get('port'), () => {
    console.log(path.join(__dirname, "../public"))
    console.log("estoy escuchando el puerto"+ app.get('port'));
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