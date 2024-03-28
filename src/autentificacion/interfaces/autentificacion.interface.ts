import {Document} from 'mongoose'
export enum EstadoAutentificacion {
    ACTIVO='ACTIVO',
    INACTIVO='INACTIVO',
}
export interface Autentificacion extends Document {
    readonly usuario: string;
    readonly contraseña: string;
}
