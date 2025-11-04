import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [UsuarioModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy],
})
export class AuthenticationModule {}
