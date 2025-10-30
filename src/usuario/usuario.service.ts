import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Usuario } from "./entities/usuario.entity";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";

@Injectable()
export class UsuarioService {

    constructor(private readonly prisma: PrismaService){
    
    }


    // 

    async create(data: CreateUsuarioDto): Promise<Usuario> {
        try {
            return await this.prisma.usuario.create({
                data
            })
        } catch (error) {
            throw error;
        }
    }

    async findAll(): Promise<Usuario[]> { // 
        try {
          return await this.prisma.usuario.findMany();
        } catch (error) {
          throw error;
        }
    }

    async findOne(id: number): Promise<Usuario | null> { // 
        try {
          return await this.prisma.usuario.findUnique({
            where: {
              id
            }, 
            // include: {
            //   tipoPokemon: true
            // }
          });
        } catch (error) {
          throw error;
        }
    }

    async update(id: number, data: UpdateUsuarioDto): Promise<Usuario> {
    
        try {
          return await this.prisma.usuario.update({
            where: { id },
            data
          })
        } catch (error) {
          throw error;
        }    
    }


    async remove(id: number) {
        try {
        
          await this.prisma.usuario.delete({
            where: { id }
          });
    
        } catch (error) {
          if(error.code === "P2025"){
            throw new NotFoundException(`No se encontro el usuario con el id: ${id}`);
          }
        }
    }


}