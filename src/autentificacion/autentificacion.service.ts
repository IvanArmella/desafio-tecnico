import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {AutentificacionDTO} from './dto/autentificacion.dto';
import {Usuario} from '../usuario/interfaces/usuario.interface';
import {compare} from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AutentificacionService {
  constructor(
    @InjectModel('Usuario') private readonly autentificacionModel: Model<Usuario>,
    private jwtService: JwtService
    ){}
  

  async validar(autentificacionDTO: AutentificacionDTO){
    let usuario=await this.autentificacionModel.findOne({usuario:autentificacionDTO.usuario}); 
    if (!usuario) {
      usuario=await this.autentificacionModel.findOne({correo:autentificacionDTO.usuario});
      if (!usuario) {return -1} 
    } 
    const resp=await compare(autentificacionDTO.contraseña,usuario.contraseña);
    if (!resp) {return 0;}
    const payload={id:usuario.id, nombre:usuario.nombre}
    const token=this.jwtService.sign(payload)
    return token;
  }
}