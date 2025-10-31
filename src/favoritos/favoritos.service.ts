import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FavoritosServices {

    
    constructor (private prisma: PrismaService){}

    async actualizarFavoritos(pokemonesIdsL: number[], usuarioId: number): Promise<void> {
        await this.prisma.usuario.update({
            where : {id: usuarioId},
            data: {
                favoritos: {
                    set: pokemonesIdsL.map(id => ({ id })),
                }
            }
        });
    }
}