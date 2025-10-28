import { Injectable } from '@nestjs/common';
import { ListaPokemon } from './dto/lista-pokemon.interface';
import { PokemonDetalle } from './dto/pokemon-detalles.interface';

@Injectable()
export class ImportarPokemonesService {

  private readonly BASE_URL = 'https://pokeapi.co/api/v2'

  async importar() {
    try {
      const response = await fetch(`${this.BASE_URL}/pokemon?limit=251&offset=0`)

      if (!response.ok) {
        throw new Error('Ha ocurrido un error')
      }

      const pokemones = (await response.json()) as ListaPokemon;

      const detalles = await Promise.allSettled(
        pokemones.results.map(async ({ url }) => {
          const res = await fetch(`${url}`)
          if (!res.ok) {
            throw new Error('Ha ocurrido un error')
          }
          const pokemon = (await res.json()) as PokemonDetalle;
          
        })
      )



    } catch (error) {

    }
  }


}
