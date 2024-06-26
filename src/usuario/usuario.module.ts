import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import {MongooseModule} from '@nestjs/mongoose';
import {usuarioSchema} from "./schemas/usuario.schema";

@Module({
  imports: [MongooseModule.forFeature([{name: 'Usuario',schema: usuarioSchema}])],
  controllers: [UsuarioController],
  providers: [UsuarioService]
})
export class UsuarioModule {}
