import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from 'src/produto/entity/produto.entity';
import { IsNull, Repository } from 'typeorm';
import { GetProdutoByIdOutPutDto } from '../dto/getProdutoByIdOutputDto';

@Injectable()
export class GetProdutoByIdRepository {
    constructor(
        @InjectRepository(ProdutoEntity)
        private readonly dataBaseService: Repository<ProdutoEntity>,
    ) {}

    async getProdutoById(id: string) {
        return await this.dataBaseService.findOne({
            select: ['id', 'nome', 'valor', 'categoria', 'descricao'],
            where: { id: id, deleted_at: IsNull() },
        });
    }
}
