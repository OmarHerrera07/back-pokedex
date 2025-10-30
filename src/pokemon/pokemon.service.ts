import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonDto } from './dto/pokemon.dto copy';

@Injectable()
export class PokemonService {

  constructor(
    private readonly prisma: PrismaService
  ) { }

  create(data: CreatePokemonDto): Promise<Pokemon> {
    try {
      return this.prisma.pokemon.create({
        data
      })
    } catch (error) {
      throw error
    }
  }

  findAll(): Promise<Pokemon[]> {
    try {
      return this.prisma.pokemon.findMany()
    } catch (error) {
      throw error
    }
  }

  findOne(id: number): Promise<PokemonDto | null> {
    try {
      return this.prisma.pokemon.findUnique({
        where: {
          id
        },
        include: {
          tipoPokemon: true
        }
      })
    } catch (error) {
      throw error
    }
  }

  update(id: number, data: UpdatePokemonDto): Promise<Pokemon | null> {
    try {
      return this.prisma.pokemon.update({
        where: {
          id
        },
        data
      })
    } catch (error) {
      throw error
    }
  }

  remove(id: number) {
    try {
      return this.prisma.pokemon.delete({
        where: {
          id
        },
      })
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`No se encontro el pokemon con id: ${id}`);
      }
      throw error;
    }
  }
}
