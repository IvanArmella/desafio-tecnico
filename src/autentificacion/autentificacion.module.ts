import {Module} from '@nestjs/common';
import {AutentificacionService} from './autentificacion.service';
import {AutentificacionController} from './autentificacion.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {usuarioSchema} from '../usuario/schemas/usuario.schema';
import {JwtModule} from '@nestjs/jwt';
import {jwtConstant} from './jwt.constants';
import {JwtStrategy} from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Usuario',schema: usuarioSchema}]),
    PassportModule,
    UsuarioModule,
    JwtModule.register({secret: jwtConstant.secret, signOptions: {expiresIn:"1h"}}),
  ],
  controllers: [AutentificacionController],
  providers: [AutentificacionService, JwtStrategy],
})
export class AutentificacionModule {}
