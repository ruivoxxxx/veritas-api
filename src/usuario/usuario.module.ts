import { Module } from '@nestjs/common';
import { UsuarioModuleService } from './services/usuarioService.module';

@Module({ imports: [UsuarioModuleService], exports: [UsuarioModuleService] })
export class UsuarioModule {}
