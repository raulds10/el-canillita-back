import mongoose, {Schema} from 'mongoose'

const noticiaSchema = new Schema({
              tituloNoticia : {
                  type: String,
                  maxlength: 150,
                  required: true
              },
              resumen : {
                  type: String,
                  maxlength: 400,
                  required: true
              },
              detalle : {
                  type : String,
                  required : true
              },
              imagen : {
                  type : String,
                  required : true
              },
              imagen2 : {
                  type : String,
              },
              categoria : {
                  type : String,
                  required : true
                 
              },
              autor : {
                  type : String,
                  required: true
              },
              fecha : {
                  type : String,
                  required: true
              },
              principal : {
                  type : Boolean,
                  required: true
              }
          },{
              timestamps : true
          });

const Noticia = mongoose.model('noticia', noticiaSchema);
export default Noticia;