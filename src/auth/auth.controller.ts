import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard.js';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: { nombreUsuario: string; password: string }) {
    return this.authService.login(body.nombreUsuario, body.password);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(
    @Req()
    request: Request & {
      user: { id: number; nombreUsuario: string; rol: string };
    },
  ) {
    return request.user;
  }
}