import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { DeleteProdutoRepository } from '../repository/deleteProduto.repository';

@Injectable()
export class DeleteProdutoService {
    constructor(
        private readonly deleteProdutoRepository: DeleteProdutoRepository,
    ) {}

    async execute(id: string) {
        try {
            const produto = await this.deleteProdutoRepository.buscaProduto(id);
            if (!produto) {
                throw new NotFoundException('Produto não encontrado');
            }
            await this.deleteProdutoRepository.deletaProduto(id);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException(error.message);
        }
    }
}
