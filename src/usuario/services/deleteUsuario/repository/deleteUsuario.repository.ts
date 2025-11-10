import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/entity/usuario.entity';
import { IsNull, Repository } from 'typeorm';
@Injectable()
export class DeleteUsuarioRepository {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly dataBaseService: Repository<UsuarioEntity>,
    ) {}
    async buscaUsuario(id: string) {
        return await this.dataBaseService.findOne({
            select: ['id'],
            where: { id: id, deleted_at: IsNull() },
        });
    }
    async deletaUsuario(id: string) {
        await this.dataBaseService
            .createQueryBuilder()
            .update(UsuarioEntity)
            .set({ deleted_at: () => 'NOW()' })
            .where('id=:id', { id: id, deleted_at: IsNull() }).execute;
    }
}
