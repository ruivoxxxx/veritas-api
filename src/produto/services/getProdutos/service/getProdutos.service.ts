import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { GetProdutosRepository } from '../repository/getProdutos.repository';
import { GetProdutosOutPutDto } from '../dto/getProdutosOutPut.dto';
import { GetProdutosInputDto } from '../dto/getProdutosInputDto';

@Injectable()
export class GetProdutosService {
    constructor(
        private readonly getProdutosRepository: GetProdutosRepository,
    ) {}

    async execute(data: GetProdutosInputDto) {
        try {
            const result = await this.getProdutosRepository.countProdutos();

            if (!result) {
                return {
                    page: data.page,
                    size: data.size,
                    total: 0,
                    data: [],
                };
            }
            const produtos = await this.getProdutosRepository.getProdutos();
            return {
                page: data.page,
                size: data.size,
                total: result,
                data: produtos,
            };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
