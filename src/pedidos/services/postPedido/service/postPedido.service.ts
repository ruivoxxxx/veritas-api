import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PedidoEntity } from 'src/pedidos/entity/pedido.entity';
import { StatusPedido } from 'src/enum/statuspedido.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/entity/usuario.entity';
import { In, IsNull, Repository } from 'typeorm';
import { PostProdutoInputDto } from 'src/produto/services/postProduto/dto/postProdutosInputDto';
import { PostPedidoInputDto } from '../dto/postPedidoInputDto';
import { ItemPedidoEntity } from 'src/pedidos/entity/itemPedido.entity';
import { ProdutoEntity } from 'src/produto/entity/produto.entity';

@Injectable()
export class PostPedidoService {
    constructor(
        @InjectRepository(PedidoEntity)
        private readonly pedidoRepository: Repository<PedidoEntity>,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
        @InjectRepository(ProdutoEntity)
        private readonly produtoRepository: Repository<ProdutoEntity>,
    ) {}
    async execute(usuario_id: string, data: PostPedidoInputDto) {
        try {
            const usuarios = await this.usuarioRepository.findOne({
                select: ['id'],
                where: { id: usuario_id, deleted_at: IsNull() },
            });
            console.log(usuarios);

            if (!usuarios) {
                throw new NotFoundException('Usuário não encontrado');
            }
            const produtosId = data.itens_pedido.map(
                (itemPedido) => itemPedido.produtoId,
            );
            const pedidoEntity = new PedidoEntity();

            const produtosRelacionados = await this.produtoRepository.findBy({
                id: In(produtosId),
            });

            const itensPedido = data.itens_pedido.map((itemPedido) => {
                const produtoRelacionado = produtosRelacionados.find(
                    (produto) => produto.id === itemPedido.produtoId,
                );

                if (!produtoRelacionado) {
                    throw new NotFoundException('O Produto não foi encontrado');
                }

                pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
                pedidoEntity.usuario = usuarios;

                const itemPedidoEntity = new ItemPedidoEntity();
                itemPedidoEntity.produto = produtoRelacionado;
                itemPedidoEntity.preco_venda = produtoRelacionado?.valor;
                itemPedidoEntity.quantidade = itemPedido.quantidade;

                itemPedidoEntity.produto!.quantidade -= itemPedido.quantidade;
                return itemPedidoEntity;
            });

            const valorTotal = itensPedido.reduce((total, item) => {
                return total + item.preco_venda! * item.quantidade;
            }, 0);

            pedidoEntity.itemPedido = itensPedido;
            pedidoEntity.valor_total = valorTotal;

            return await this.pedidoRepository.save(pedidoEntity);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException(error.message);
        }
    }
}
