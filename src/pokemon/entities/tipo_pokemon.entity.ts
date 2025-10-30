import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, isNumber, IsPositive, IsString, IsUrl } from "class-validator";
import { tipo_pokemon } from "generated/prisma/client";

export class TipoPokemon implements tipo_pokemon{

    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre: string;

}
