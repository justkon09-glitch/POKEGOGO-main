import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength
} from 'class-validator';

export class CreateAdminDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  nombreUsuario: string;

  @IsEmail()
  @MaxLength(150)
  correo: string;

  @IsString()
  @MinLength(8)
  password: string;
}