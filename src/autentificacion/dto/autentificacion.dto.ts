import {IsNotEmpty,MinLength,MaxLength} from 'class-validator';
export class AutentificacionDTO {
    @IsNotEmpty()
    readonly usuario: string
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    readonly contraseña: string
}
