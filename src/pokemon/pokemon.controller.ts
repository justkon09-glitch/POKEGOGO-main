import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { PokemonService } from './pokemon.service.js';
import { CreatePokemonDto } from './dto/create-pokemon.dto.js';
import { Roles } from '../auth/roles.decorator.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { RolesGuard } from '../auth/roles.guard.js';

@Controller('pokemon')
export class PokemonController {
 constructor(private service:PokemonService) {}
 
 @Post() 
  @Roles('ADMIN') // no heehee
  @UseGuards(JwtAuthGuard, RolesGuard)
 create(@Body() dto:CreatePokemonDto) {
   return this.service.create(dto as any); 
 }

 @Get() 
 findAll() {
   return this.service.findAll(); 

 }

 @Get(':id') 
 findOne(@Param('id',ParseIntPipe) id:number) {
   return this.service.findOne(id); 
  }

 @Patch(':id') 
  @Roles('ADMIN') //only admin can updat
  @UseGuards(JwtAuthGuard, RolesGuard)
 update(@Param('id',ParseIntPipe) id:number,@Body() dto:Partial<CreatePokemonDto>) {
   return this.service.update(id,dto as any); 
  }

 @Delete(':id') 
  @Roles('ADMIN') //onnly admin can remoof
  @UseGuards(JwtAuthGuard, RolesGuard)
 remove(@Param('id',ParseIntPipe) id:number) {
   return this.service.remove(id); 
  }
}

