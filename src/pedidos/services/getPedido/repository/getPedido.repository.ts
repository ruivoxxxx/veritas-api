import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from 'src/pedidos/entity/pedido.entity';
import { IsNull, Repository } from 'typeorm';
import { GetPedidoInputDto } from '../dto/getPedidoInputDto';

@Injectable()
export class GetPedidoRepository {
    constructor(
        @InjectRepository(PedidoEntity)
        private readonly dataBaseService: Repository<PedidoEntity>,
    ) {}

    async buscaProduto(data: GetPedidoInputDto) {
        const result = await this.dataBaseService.find({
            where: data.id_produto
                ? { id: data.id_produto, deleted_at: IsNull() }
                : { deleted_at: IsNull() },
        });

        return result ?? [];
    }
}
