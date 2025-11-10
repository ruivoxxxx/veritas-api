import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/auth/controller/auth.controller';
import { UsuarioEntity } from 'src/usuario/entity/usuario.entity';
import { AuthService } from './service/login.service';
import { PostUsuarioRepository } from 'src/usuario/services/postUsuario/repository/postUsuario.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forFeature([UsuarioEntity]),
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.get<string>('JWT_SECRET'),
                    signOptions: { expiresIn: '72h' },
                };
            },
            inject: [ConfigService],
            global: true,
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, PostUsuarioRepository],
})
export class AuthModuleService {}
