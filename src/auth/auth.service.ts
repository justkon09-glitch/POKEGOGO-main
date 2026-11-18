
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Usuario } from '../usuario/entities/usuario.entity.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  async login(correo: string, password: string) {
    console.log('Intentando login:', correo);

    // Buscar por correo, no por nombreUsuario
    const usuario = await this.usuarioRepository.findOne({
      where: { correo },
      relations: {
        rol: true,
      },
    });

    console.log('Usuario encontrado:', !!usuario);

    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    console.log('Tiene contraseña:', !!usuario.password);
    console.log('Rol encontrado:', usuario.rol?.nombre);

    // Validar contraseña
    const passwordValida = await bcrypt.compare(
      password,
      usuario.password,
    );

    console.log('Contraseña válida:', passwordValida);

    if (!passwordValida) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = {
      sub: usuario.id,
      correo: usuario.correo,
      nombreUsuario: usuario.nombreUsuario,
      rol: usuario.rol.nombre,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
