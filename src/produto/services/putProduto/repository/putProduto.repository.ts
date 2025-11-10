import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from 'src/produto/entity/produto.entity';
import { IsNull, Repository } from 'typeorm';
import { PutProdutoInputDto } from '../dto/putProdutoInputDto';
import { Injectable } from '@nestjs/common';
@Injectable()
export class PutProdutoRepository {
    constructor(
        @InjectRepository(ProdutoEntity)
        private readonly dataBaseService: Repository<ProdutoEntity>,
    ) {}

    async buscaProduto(id: string) {
        return await this.dataBaseService.findOne({
            select: ['id'],
            where: { id: id, deleted_at: IsNull() },
        });
    }

    async atualizaProduto(data: PutProdutoInputDto) {
        await this.dataBaseService
            .createQueryBuilder()
            .update(ProdutoEntity)
            .set({
                nome: data.nome,
                valor: data.valor,
                descricao: data.descricao,
                categoria: data.categoria,
                updated_at: () => 'NOW()',
            })
            .where('id= :id', { id: data.id, deleted_at: IsNull() })
            .execute();
    }
}
