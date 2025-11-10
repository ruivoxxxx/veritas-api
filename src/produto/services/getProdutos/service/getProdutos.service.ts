import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GetProdutosRepository } from '../repository/getProdutos.repository';
import { GetProdutosOutPutDto } from '../dto/getProdutosOutPut.dto';

@Injectable()
export class GetProdutosService {
    constructor(
        private readonly getProdutosRepository: GetProdutosRepository,
    ) {}

    async execute(): Promise<GetProdutosOutPutDto[]> {
        try {
            const produtos = await this.getProdutosRepository.getProdutos();
            return produtos;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
