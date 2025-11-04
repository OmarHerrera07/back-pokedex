import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Request } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import type { Response } from 'express';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  // login
  @Post()
  async login(@Request() req,@Res({ passthrough: true}) response: Response){
    return this.authenticationService.login(req.user, response)

  }
  // refresh


  //logout



}
