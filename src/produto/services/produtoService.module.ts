import { Module } from '@nestjs/common';
import { ProdutoController } from '../controller/produto.controller';

import { ProdutoEntity } from '../entity/produto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostProdutoService } from './postProduto/service/postProdutos.service';
import { PutProdutoService } from './putProduto/service/putProduto.service';
import { GetProdutoByIdService } from './getProdutoById/service/getProdutoById.service';

import { GetProdutoByIdRepository } from './getProdutoById/repository/getProdutoById.repository';
import { PutProdutoRepository } from './putProduto/repository/putProduto.repository';
import { DeleteProdutoService } from './deleteProduto/service/deleteProduto.service';
import { DeleteProdutoRepository } from './deleteProduto/repository/deleteProduto.repository';
import { PostProdutoRepository } from './postProduto/repository/postProdutos.repository';
import { GetProdutosService } from './getProdutos/service/getProdutos.service';
import { GetProdutosRepository } from './getProdutos/repository/getProdutos.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ProdutoEntity])],
    controllers: [ProdutoController],
    providers: [
        GetProdutosService,
        GetProdutosRepository,
        GetProdutoByIdService,
        GetProdutoByIdRepository,
        PostProdutoService,
        PostProdutoRepository,
        PutProdutoService,
        PutProdutoRepository,
        DeleteProdutoService,
        DeleteProdutoRepository,
    ],
})
export class ProdutoServiceModule {}
