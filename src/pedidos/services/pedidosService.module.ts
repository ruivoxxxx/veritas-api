import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoEntity } from '../entity/pedido.entity';
import { Module } from '@nestjs/common';
import { PedidoController } from '../controller/pedido.controller';
import { PostPedidoService } from './postPedido/service/postPedido.service';
import { UsuarioEntity } from 'src/usuario/entity/usuario.entity';
import { GetPedidoService } from './getPedido/service/getPedido.service';
import { GetPedidoRepository } from './getPedido/repository/getPedido.repository';
import { ItemPedidoEntity } from '../entity/itemPedido.entity';
import { ProdutoEntity } from 'src/produto/entity/produto.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PedidoEntity,
            UsuarioEntity,
            ItemPedidoEntity,
            ProdutoEntity,
        ]),
    ],
    controllers: [PedidoController],
    providers: [PostPedidoService, GetPedidoService, GetPedidoRepository],
})
export class PedidosServiceModule {}
