import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtAuthGuard } from './guard/jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';
import { ApiConfigService } from 'src/configuration/api-config.service';

@Module({
  imports: [UsuarioModule, ConfigModule, JwtModule], // JwtModule
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, JwtAuthGuard, JwtStrategy, JwtRefreshStrategy, ApiConfigService],  
})
export class AuthenticationModule {}
