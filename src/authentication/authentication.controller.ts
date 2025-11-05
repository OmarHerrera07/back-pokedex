import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Request, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import type { Response } from 'express';
import { LocalAuthGuard } from './guard/local.guard';
import { Public } from './decorator/public.decorator';
import { JwtRefreshAuthGuard } from './guard/jwt-refresh-auth.guard';

@Controller('/authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  // login
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@Request() req,@Res({ passthrough: true}) response: Response){
    return this.authenticationService.login(req.user, response)
  }
  // refresh
  @UseGuards(JwtRefreshAuthGuard)
  @Post("/refresh")
  refresh(@Request() req, @Res({ passthrough: true}) response: Response){
    return this.authenticationService.refresh(req.user, response);
  }


  //logout
  @Public()
  @Post("/logout")
  async logout(@Res({ passthrough: true}) response: Response){

    response.clearCookie("Authentication")
    response.clearCookie("Refresh", { path: '/authentication/refresh' })


  }


}
