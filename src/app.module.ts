import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import {MongooseModule} from '@nestjs/mongoose';
import { TareaModule } from './tarea/tarea.module';
import { AutentificacionModule } from './autentificacion/autentificacion.module';



@Module({
  imports: [UsuarioModule, MongooseModule.forRoot("mongodb+srv://desafio-tecnico:T9Z4LUMsniidSsrT@cluster0.96xzqge.mongodb.net/desafio-tecnico?retryWrites=true&w=majority&appName=Cluster0"), TareaModule, AutentificacionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
