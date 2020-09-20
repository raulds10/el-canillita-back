import mongoose from 'mongoose';

const url = "mongodb+srv://admin:admin1234@cluster0.wajr3.mongodb.net/<dbname>?retryWrites=true&w=majority"; //cadena de conexion

mongoose.connect(url, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:true,
    useUnifiedTopology:true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("db conectada")
})