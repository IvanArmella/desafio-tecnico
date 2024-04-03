import {Controller, Get, Post, Put, Delete, Res, HttpStatus,Body, Param, UseGuards,Request} from '@nestjs/common';
import {CrearTareaDTO,TareaDTO} from './dto/tarea.dto';
import {TareaService} from './tarea.service'; 
import {JwtAutGuard} from 'src/autentificacion/jwt.guard';
import {EstadoTarea} from './dto/tarea.dto';  


@Controller('tarea')
export class TareaController {
    constructor(private readonly tareaService: TareaService) {}
    @UseGuards(JwtAutGuard)
    @Post('/registrar')
    async registrarTarea(@Res() res,@Request() req,@Body() tareaDTO: CrearTareaDTO){
        tareaDTO.autorId=req.user.id;
        tareaDTO.estado=EstadoTarea.PENDIENTE;
        const tarea=await this.tareaService.registrarTarea(tareaDTO);
        return res.status(HttpStatus.OK).json({
            message:'Tarea creado con exito',
            tarea
        });
    }

    @Get("/")
    async buscarTareas(@Res() res){
        const tareas=await this.tareaService.buscarTareas(undefined);
        return res.status(HttpStatus.OK).json({
            message:'Tareas encontradas con exito',
            tareas
        });
    }

    @UseGuards(JwtAutGuard)
    @Get("/buscar/:tareaId")
    async buscarTarea(@Res() res,@Param("tareaId") tareaId) {
        const tarea=await this.tareaService.buscarTarea(tareaId);
        return res.status(HttpStatus.OK).json({
            message:'Tarea recuperada con exito.',
            tarea
        })
    }

    @UseGuards(JwtAutGuard)
    @Get("/misTareas")
    async buscarMisTareas(@Res() res,@Request() req){
        const tareas=await this.tareaService.buscarTareas(req.user.id);
        return res.status(HttpStatus.OK).json({
            message:'Tareas propias encontradas con exito',
            tareas
        });
    }

    @UseGuards(JwtAutGuard)
    @Put('/actualizar/:tareaId')
    async actualizarTarea(@Res() res,@Request() req,@Param('tareaId') tareaId, @Body() tareaDTO: TareaDTO){
        const tarea=await this.tareaService.actualizarTarea(tareaId,tareaDTO,req.user.id);
        return res.status(HttpStatus.OK).json({
            message:'Tarea actualizada con exito',
            tarea
        });
    }

    @UseGuards(JwtAutGuard)
    @Delete('/borrar/:tareaId')
    async borrarTarea(@Res() res,@Request() req,@Param('tareaId') tareaId) {
        const tarea=await this.tareaService.borrarTarea(tareaId,req.user.id);
        return res.status(HttpStatus.OK).json({
            message:'Tarea borrada con exito',
            tarea
        });
    }
}
