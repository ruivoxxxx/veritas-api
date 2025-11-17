import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/entity/usuario.entity';
import { IsNull, Repository } from 'typeorm';
@Injectable()
export class GetUsuarioByIdRepository {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly dataBaseService: Repository<UsuarioEntity>,
    ) {}
    async getUsuarioById(id: string) {
        return await this.dataBaseService.findOne({
            select: ['id', 'nome', 'email', 'senha'],
            where: { id: id, deleted_at: IsNull() },
        });
    }
}
