import {Controller, Get, Post, Put, Delete, Res, HttpStatus,Body, Param, NotFoundException,Query, UseGuards,Request,} from '@nestjs/common';
import {UsuarioDTO} from './dto/usuario.dto';
import {UsuarioService} from './usuario.service'
import {JwtAutGuard} from 'src/autentificacion/jwt.guard';

@Controller('usuario')
export class UsuarioController {
    constructor(private usuarioService: UsuarioService){}
    @Post('/registrar')
    async registrarUsuario(@Res() res,@Body() usuarioDTO: UsuarioDTO){
        const usuario= await this.usuarioService.registrarUsuario(usuarioDTO);
        return res.status(HttpStatus.OK).json({
            message:'Usuario creado con exito',
            usuario: usuario
        });
    }

    @UseGuards(JwtAutGuard)
    @Get('/')
    async obtenerUsuarios(@Res() res) {
        const usuarios=await this.usuarioService.obtenerUsuarios();
        return res.status(HttpStatus.OK).json({usuarios});

    }

    @UseGuards(JwtAutGuard)
    @Get('/:usuarioId')
    async obtenerUsuario(@Res() res,@Param('usuarioId') usuarioId) {
        const usuario=await this.usuarioService.obtenerUsuario(usuarioId);
        if (!usuario) throw new NotFoundException('Usuario no existe');
        return res.status(HttpStatus.OK).json({usuario});
    }

    @UseGuards(JwtAutGuard)
    @Delete('/borrar')
    async borrarUsuario(@Request() req,@Res() res, @Query('usuarioId') usuarioId: string){
        const usuario=await this.usuarioService.borrarUsuario(usuarioId);
        if (!usuario) throw new NotFoundException('Usuario no existe');
        return res.status(HttpStatus.OK).json({usuario});
    }

    @UseGuards(JwtAutGuard)
    @Put('/actualizar')
    async actualizarUsuario(@Request() req,@Res() res,@Body() usuarioDTO: UsuarioDTO,@Query('usuarioId') usuarioId) {
        const usuario=await this.usuarioService.actualizarUsuario(usuarioId,usuarioDTO);
        if (!usuario) throw new NotFoundException('Usuario no existe');
        return res.status(HttpStatus.OK).json({usuario});
    }
}
