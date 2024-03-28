import {Document} from 'mongoose'

export interface Usuario extends Document {
    usuario: string;
    nombre: string;
    apellido: string;
    correo: string;
    contraseña: string;
}