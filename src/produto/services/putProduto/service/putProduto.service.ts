import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PutProdutoInputDto } from '../dto/putProdutoInputDto';
import { PutProdutoRepository } from '../repository/putProduto.repository';
@Injectable()
export class PutProdutoService {
    constructor(private readonly putProdutoRepository: PutProdutoRepository) {}

    async execute(id: string, data: PutProdutoInputDto) {
        try {
            const produto = await this.putProdutoRepository.buscaProduto(id);
            if (!produto) {
                throw new NotFoundException('Produto não encontrado');
            }
            await this.putProdutoRepository.atualizaProduto(data);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException(error.message);
        }
    }
}
