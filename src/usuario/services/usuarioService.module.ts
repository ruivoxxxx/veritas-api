import { Module } from '@nestjs/common';
import { UsuarioController } from '../controller/usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from '../entity/usuario.entity';
import { GetUsuarioService } from './getUsuario/service/getUsuario.service';
import { PostUsuarioService } from './postUsuario/service/postUsuario.service';
import { PutUsuarioService } from './putUsuario/service/putUsuario.service';
import { DeleteUsuarioService } from './deleteUsuario/service/deleteUsuario.service';
import { PostUsuarioRepository } from './postUsuario/repository/postUsuario.repository';
import { GetUsuarioByIdService } from './getUsuarioById/service/getUsuarioById.service';
import { GetUsuarioByIdRepository } from './getUsuarioById/repository/getUsuarioById.repository';
import { GetUsuarioRepository } from './getUsuario/repository/getUsuario.repository';
import { DeleteUsuarioRepository } from './deleteUsuario/repository/deleteUsuario.repository';
import { PutUsuarioRepository } from './putUsuario/repository/putUsuario.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity])],
    controllers: [UsuarioController],
    providers: [
        GetUsuarioService,
        GetUsuarioRepository,
        GetUsuarioByIdService,
        GetUsuarioByIdRepository,
        PostUsuarioService,
        PostUsuarioRepository,
        PutUsuarioService,
        PutUsuarioRepository,
        DeleteUsuarioService,
        DeleteUsuarioRepository,
    ],
})
export class UsuarioModuleService {}
