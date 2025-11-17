import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/entity/usuario.entity';
import { IsNull, Repository } from 'typeorm';
import { GetUsuarioOutputDto } from '../dto/getUsuarioOutputDto';
import { Injectable } from '@nestjs/common';
@Injectable()
export class GetUsuarioRepository {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly dataBaseService: Repository<UsuarioEntity>,
    ) {}

    async getUsuarios(): Promise<GetUsuarioOutputDto[]> {
        return await this.dataBaseService.find({
            select: ['id', 'nome', 'email', 'senha'],
            where: { deleted_at: IsNull() },
        });
    }
}
