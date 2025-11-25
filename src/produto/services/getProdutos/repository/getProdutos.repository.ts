import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from 'src/produto/entity/produto.entity';
import { IsNull, Repository } from 'typeorm';
import { GetProdutosOutPutDto } from '../dto/getProdutosOutPut.dto';

@Injectable()
export class GetProdutosRepository {
    constructor(
        @InjectRepository(ProdutoEntity)
        private readonly dataBaseService: Repository<ProdutoEntity>,
    ) {}

    async countProdutos(): Promise<number> {
        const sql = `
        SELECT COUNT(*) AS TOTAL
        FROM PRODUTOS 
        WHERE DELETED_AT IS NULL `;

        const result = await this.dataBaseService.query<{ total: number }>(sql);

        return result[0]?.total;
    }

    async getProdutos(): Promise<GetProdutosOutPutDto[]> {
        const result = await this.dataBaseService.find({
            select: ['id', 'nome', 'valor', 'categoria', 'descricao'],
            where: { deleted_at: IsNull() },
        });

        return result ?? [];
    }
}
