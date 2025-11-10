import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from 'src/produto/entity/produto.entity';
import { IsNull, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
Injectable();
export class DeleteProdutoRepository {
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

    async deletaProduto(id: string) {
        await this.dataBaseService
            .createQueryBuilder()
            .update(ProdutoEntity)
            .set({
                deleted_at: () => 'NOW()',
            })
            .where('id= :id', { id: id, deleted_at: IsNull() })
            .execute();
    }
}
