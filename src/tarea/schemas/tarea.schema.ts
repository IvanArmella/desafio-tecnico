import {Schema} from 'mongoose'

export const TareaSchema=new Schema({
    nombre: {type: String,required: true},
    descripcion: {type: String,required: true},
    estado: {type: String,required: true},
    autorId: {type: String,required: true}
})