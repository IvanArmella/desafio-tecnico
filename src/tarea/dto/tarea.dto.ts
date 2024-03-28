import {IsNotEmpty, IsString, IsEnum} from 'class-validator';

export enum EstadoTarea {
    PENDIENTE='PENDIENTE',
    EN_PROGRESO='EN_PROGRESO',
    CANCELADA='CANCELADA',
    TERMINADA='TERMINADA',
}

export class TareaDTO {
    @IsString()
    @IsNotEmpty()
    nombre: string;
    @IsString()
    @IsNotEmpty()
    descripcion: string;
    autorId: string
    @IsString()
    @IsEnum(EstadoTarea)
    estado: EstadoTarea;
}

export class CrearTareaDTO {
    @IsNotEmpty()
    nombre: string;
    @IsNotEmpty()
    descripcion: string;
    autorId: string
    estado: EstadoTarea;
}