import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, isNumber, IsPositive, IsString, IsUrl } from "class-validator";
import { pokemon, usuario } from "generated/prisma/client";

export class Usuario implements usuario{
    id: number;
    username: string;
    contrasena: string;

}