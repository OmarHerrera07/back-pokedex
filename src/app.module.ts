import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { ImportarPokemonesModule } from './importar-pokemones/importar-pokemones.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './usuario/usuario.module';
import { LogginInterceptor } from './shared/interceptores/loggin.interceptor';
import { EquipoModule } from './equipo/equipo.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { JwtAuthGuard } from './authentication/guard/jwt.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PokemonModule, ImportarPokemonesModule, UsuarioModule, EquipoModule, AuthenticationModule],
  controllers: [],
  providers: [PrismaService, 
    {
      provide: "APP_INTERCEPTOR",
      useClass: LogginInterceptor
    },
    {
      provide: "APP_GUARD",
      useClass: JwtAuthGuard
    }
], // FavoritosDto
})
export class AppModule { }
