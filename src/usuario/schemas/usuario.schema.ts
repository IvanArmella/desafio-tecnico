import {Schema} from 'mongoose'

export const usuarioSchema=new Schema({
    usuario: {type: String,required:true, unique:true}, //borrar
    nombre: {type: String},
    apellido: {type: String},
    correo: {type: String,required:true, unique:true},
    contraseña: {type: String,required:true},
})

