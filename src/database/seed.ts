
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module.js';
import { DataSource } from 'typeorm';
import { Role } from '../roles/entities/role.entity.js';
import { Usuario } from '../usuario/entities/usuario.entity.js';

async function seed() {

  const app = await NestFactory.createApplicationContext(AppModule);

  try {

    const dataSource = app.get(DataSource);

    const roleRepository = dataSource.getRepository(Role);
    const usuarioRepository = dataSource.getRepository(Usuario);

    console.log('Conectado a la base de datos');

    // CREAR ROL ADMIN

    let adminRole = await roleRepository.findOne({
      where: { nombre: 'ADMIN' }
    });

    if (!adminRole) {

      adminRole = roleRepository.create({
        nombre: 'ADMIN',
        descripcion: 'Administrador del sistema'
      });

      adminRole = await roleRepository.save(adminRole);

      console.log('Rol ADMIN creado');

    }

    // CREAR ROL USER

    let userRole = await roleRepository.findOne({
      where: { nombre: 'USER' }
    });

    if (!userRole) {

      userRole = roleRepository.create({
        nombre: 'USER',
        descripcion: 'Usuario normal con permisos de lectura'
      });

      await roleRepository.save(userRole);

      console.log('Rol USER creado');

    }

    // CREAR ADMINISTRADOR

    const adminExistente = await usuarioRepository.findOne({
      where: { nombreUsuario: 'admin' }
    });

    if (!adminExistente) {

      const password = process.env.ADMIN_PASSWORD;
      const correo = process.env.ADMIN_EMAIL;

      if (!password || !correo) {
        throw new Error(
          'Configura ADMIN_PASSWORD y ADMIN_EMAIL en .env'
        );
      }

      const admin = usuarioRepository.create({
        nombreUsuario: 'admin',
        correo,
        password,
        rolId: adminRole.id
      });

      await usuarioRepository.save(admin);

      console.log('Administrador creado correctamente');

    } else {

      console.log('El administrador ya existe');

    }

    console.log('Seeder ejecutado correctamente');

  } catch (error) {

    console.error('Error ejecutando Seeder:', error);
    process.exitCode = 1;

  } finally {

    await app.close();

  }
}

seed();
