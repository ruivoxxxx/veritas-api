import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GetPedidoInputDto } from '../dto/getPedidoInputDto';
import { GetPedidoRepository } from '../repository/getPedido.repository';

@Injectable()
export class GetPedidoService {
    constructor(private readonly getPedidoRepository: GetPedidoRepository) {}

    async execute(data: GetPedidoInputDto) {
        try {
            return await this.getPedidoRepository.buscaProduto(data);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
