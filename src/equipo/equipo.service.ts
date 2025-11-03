import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUsuarioDto } from "src/usuario/dto/create-usuario.dto";

@Injectable()
export class EquipoService {
// TODO REGISTRAR EQUIPO
  constructor(private readonly prisma: PrismaService){}

  async create(data: CreateUsuarioDto) {
      try {

        // return await this.prisma.usuario.create({
        //     data
        // });
      } catch (error) {
        if(error.code === 'P2002') {
          throw new ConflictException(`Error: Usuario existente! : ${data.username}`);
        }
          
      }
  }

}