import { PrismaService } from "src/prisma/prisma.service";
import { UsuarioController } from "./usuario.controller";
import { UsuarioService } from "./usuario.service";
import { Module } from "@nestjs/common";

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, PrismaService],
})
export class UsuarioModule {}