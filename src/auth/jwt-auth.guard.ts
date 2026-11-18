import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
//safety
export class JwtAuthGuard extends AuthGuard('jwt') {}