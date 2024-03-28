import {Injectable, UnauthorizedException} from "@nestjs/common";
import {Model} from 'mongoose';
import {InjectModel} from "@nestjs/mongoose"
import {Usuario} from '../usuario/interfaces/usuario.interface'
import {PassportStrategy} from "@nestjs/passport"
import {ExtractJwt, Strategy} from "passport-jwt";
import {jwtConstant} from "./jwt.constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey: jwtConstant.secret
        });
    }

    async validate(payload:any){
        const usuario=await this.usuarioModel.findById(payload.id);
        if (!usuario) {throw new UnauthorizedException("Token invalido.");}
        return payload;
    }


}