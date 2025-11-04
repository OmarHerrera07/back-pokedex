import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(  ){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request.cookies?.Authentication,
            ]),
        })
    }

    async validate(username: string, password: string): Promise<any>{
        const user = await this.auth.validarUsuario(username, password)
        if(!user){
            throw new UnauthorizedException();
        }
        return user;

    }



}