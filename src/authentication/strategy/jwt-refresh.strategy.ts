import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Payload } from "../interface/payload.interface";
import { ApiConfigService } from "src/configuration/api-config.service";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh'){

    constructor( private config: ApiConfigService ){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request.cookies?.Refresh,
            ]),
            ignoreExpiration: false,
            secretOrKey: config.getJwtSecret,
            passReqToCallback: true
        })
    }

    async validate( payload: Payload){


        return payload;
    }



}