import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthenticationService } from "../authentication.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor( private auth: AuthenticationService){
        super({
            usernameField: 'username',
            passwordField: 'constrasena'
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