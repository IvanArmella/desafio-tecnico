import {Controller, Post, Res, Body, HttpStatus, HttpException} from '@nestjs/common';
import {AutentificacionDTO} from './dto/autentificacion.dto';
import {AutentificacionService} from './autentificacion.service';

@Controller('autentificacion')
export class AutentificacionController {
  constructor(private autentificacionService: AutentificacionService) {}

  @Post('/')
  async login(@Res() res,@Body() autentificacionDTO: AutentificacionDTO) {
    const autentificacion=await this.autentificacionService.validar(autentificacionDTO);
    if (autentificacion==-1) throw new HttpException('Usuario no encontrado.',404);
    else if (autentificacion==0) throw new HttpException('Contraseña incorrecta.',403);
    return res.status(HttpStatus.OK).json({autentificacion});
  }
    
}