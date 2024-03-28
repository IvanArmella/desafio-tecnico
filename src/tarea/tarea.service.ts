import { Injectable, UnauthorizedException } from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from "@nestjs/mongoose"
import {Tarea} from './interfaces/tarea.interface'
import {TareaDTO} from './dto/tarea.dto'

@Injectable()
export class TareaService {
    constructor(@InjectModel("Tarea") private readonly tareaModel: Model<Tarea>){}
    async registrarTarea(tareaDTO: TareaDTO){
        const tarea=new this.tareaModel(tareaDTO);
        return await tarea.save()
    }

    async buscarTareas(usuarioId: string): Promise<Tarea[]> {
        let tareas;
        if (!usuarioId) {tareas=await this.tareaModel.find();}
        else {tareas=await this.tareaModel.find({autorId:usuarioId})}
        return tareas;
    }

    async buscarTarea(tareaId:string): Promise<Tarea> {
        const tarea=await this.tareaModel.findById(tareaId);
        return tarea;
    }

    async actualizarTarea(tareaId:string, tareaDTO:TareaDTO, usuarioId:string){
        let tarea=await this.tareaModel.findById(tareaId);
        if (tarea.autorId!==usuarioId) {throw new UnauthorizedException('Los usuarios solo pueden actualizar tareas propias.')}
        tarea=await this.tareaModel.findByIdAndUpdate(tareaId,tareaDTO,{new:true});
        return tarea;
    }

    async borrarTarea(tareaId:string, usuarioId:string){
        let tarea=await this.tareaModel.findById(tareaId);
        if (tarea.autorId!==usuarioId) {throw new UnauthorizedException('Los usuarios solo pueden borrar tareas propias.')}
        tarea=await this.tareaModel.findByIdAndDelete(tareaId);
        return tarea;
    }
}
