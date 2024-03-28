import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from "@nestjs/mongoose"
import {Usuario} from './interfaces/usuario.interface'
import {UsuarioDTO} from './dto/usuario.dto'
import {hash} from 'bcrypt'

@Injectable()
export class UsuarioService {
    constructor(@InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>){}
    async obtenerUsuarios(): Promise<Usuario[]> {
        const usuarios=await this.usuarioModel.find();
        return usuarios;
    }

    async obtenerUsuario(usuarioId: string): Promise<Usuario> {
        const usuario=await this.usuarioModel.findById(usuarioId);
        return usuario;
    }

    async registrarUsuario(usuarioDTO: UsuarioDTO):Promise<Usuario> {
        const encriptada=await hash(usuarioDTO.contraseña,10);
        usuarioDTO={...usuarioDTO,contraseña:encriptada};
        const usuario=new this.usuarioModel(usuarioDTO);
        return await usuario.save();
    }

    async borrarUsuario(usuarioID:string): Promise<Usuario> {
        const usuario=await this.usuarioModel.findByIdAndDelete(usuarioID);
        return usuario;
    }

    async actualizarUsuario(usuarioID:string,usuarioDTO:UsuarioDTO): Promise<Usuario> {
        const encriptada=await hash(usuarioDTO.contraseña,10);
        usuarioDTO={...usuarioDTO,contraseña:encriptada};
        const usuario=await this.usuarioModel.findByIdAndUpdate(usuarioID,usuarioDTO,{new:true});
        return usuario;
    }
}