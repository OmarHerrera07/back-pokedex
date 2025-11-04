import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Request, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import type { Response } from 'express';
import { LocalAuthGuard } from './guard/local.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  // login
  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req,@Res({ passthrough: true}) response: Response){
    return this.authenticationService.login(req.user, response)
  }
  // refresh


  //logout



}
