import { IsNotEmpty, IsEmail,MinLength,MaxLength} from "class-validator";

export class UsuarioDTO {
    @IsNotEmpty()
    usuario: string;

    @IsNotEmpty()
    nombre: string;

    @IsNotEmpty()
    apellido: string;

    @IsNotEmpty()
    @IsEmail()
    correo: string;

    @MinLength(4)
    @MaxLength(20)
    contraseña: string;
}