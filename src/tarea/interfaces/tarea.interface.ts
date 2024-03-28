import {Document} from 'mongoose'
import {EstadoTarea} from '../dto/tarea.dto';  

export interface Tarea extends Document {
    nombre: string;
    descripcion: string;
    autorId: string
    estado: EstadoTarea;
}