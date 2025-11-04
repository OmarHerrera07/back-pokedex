import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as argon2 from 'argon2';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Payload } from './interface/payload.interface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import ms from 'ms';

// import { ms, type StringValue } from 'ms';

@Injectable()
export class AuthenticationService {


  constructor(private usuarioService: UsuarioService,
    private config: ConfigService,
    private jwtService: JwtService
  ) {}

  async validarUsuario (username: string, pass: string){
    const user = await this.usuarioService.findByUsername(username);

    if(user){
      if(user.contrasena){
        if(await argon2.verify(user.contrasena, pass)){
          return user;
        }
      }
    }

    return null;

  }

  async login (usuario: Usuario, response: Response){
    const payload = this.getPayload(usuario)

    const secret = this.config.get("JWT-_SECRET");
    const expiresIn = this.config.get("JWT_EXPIRES_IN");
    const refshSecret = this.config.get("JWT_REFRESH_SECRET");
    const expiresRefresh = this.config.get("JWT_REFRESH_EXPIRES_INECRET");
    const environment = this.config.get("NODE_ENV");

    const token = this.jwtService.sign(payload, {
      secret,
      expiresIn
    });

    // insertar cookie en el response
    response.cookie('Authentication', token, {
      httpOnly: true,
      secure: environment === 'production', 
      // maxAge: ms(expiresIn as StringValue)
      maxAge: ms(`${expiresIn}`)
    });

    return { payload }
  }

  getPayload({id, username}: Usuario): Payload{
    return  {
      id, 
      username, 
      sub: id
    }
  }

  // create(createAuthenticationDto: CreateAuthenticationDto) {
  //   return 'This action adds a new authentication';
  // }

  // findAll() {
  //   return `This action returns all authentication`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} authentication`;
  // }

  // update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
  //   return `This action updates a #${id} authentication`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} authentication`;
  // }
}
