import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonDto } from './dto/pokemon.dto';
import { PrismaQueryParamsDto } from 'src/shared/dto/prisma-query-params.dto';
import { PaginatedResponseDto } from 'src/shared/dto/paginated-response.dto';
import { buildPaginatedResponse } from 'src/shared/helpers/build-paginated-response';

@Injectable()
export class PokemonService {

  constructor(private readonly prisma: PrismaService){

  }

  async create(data: CreatePokemonDto):Promise<Pokemon> {
    
    try {
      return await this.prisma.pokemon.create({
        data
      })
    } catch (error) {
      throw error;
    }
    
  }

  async findAll(params: PrismaQueryParamsDto): Promise<PaginatedResponseDto<Pokemon>> {

    const { skip, take, where, orderBy } = params;

    try {      
      const [data, total] = await Promise.all([
        this.prisma.pokemon.findMany({ skip, take, where}),
        this.prisma.pokemon.count({ where })
        // this.prisma.pokemon.count()
      ]);

      return buildPaginatedResponse({ data, total, skip, take })
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<PokemonDto | null> { // 
    try {
      return await this.prisma.pokemon.findUnique({
        where: {
          id
        }, 
        include: {
          tipoPokemon: true
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updatePokemonDto: UpdatePokemonDto): Promise<Pokemon> {

    try {
      return await this.prisma.pokemon.update({
        where: { id },
        data: updatePokemonDto
      })
    } catch (error) {
      throw error;
    }    
  }

  async remove(id: number) {
    try {
    
      await this.prisma.pokemon.delete({
        where: {
          id
        }
      });

    } catch (error) {
      if(error.code === "P2025"){

        throw new NotFoundException(`No se encontro el pokemon con el id: ${id}`);
      }
    }


  }
}
