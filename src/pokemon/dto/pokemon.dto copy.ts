import { IsArray, ValidateNested } from "class-validator";
import { Pokemon } from "../entities/pokemon.entity";
import { TipoPokemon } from '../entities/tipo-pokemon';
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class PokemonDto extends Pokemon {

    @ApiProperty()
    @IsArray()
    @ValidateNested({each: true})
    @Type(()=> TipoPokemon)
    tipoPokemon: TipoPokemon[]
}