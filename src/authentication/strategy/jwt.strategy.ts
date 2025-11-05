import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Payload } from "../interface/payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor( private config: ConfigService ){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request.cookies?.Authentication,
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || "MISECRET",

        })
    }

    async validate( payload: Payload){
        return payload;
    }



}