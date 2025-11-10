import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';

import {
    ApiBadRequestResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
} from '@nestjs/swagger';
import { PostProdutoInputDto } from '../services/postProduto/dto/postProdutosInputDto';
import { PostProdutoService } from '../services/postProduto/service/postProdutos.service';
import { PutProdutoInputDto } from '../services/putProduto/dto/putProdutoInputDto';
import { PutProdutoService } from '../services/putProduto/service/putProduto.service';
import { GetProdutoByIdService } from '../services/getProdutoById/service/getProdutoById.service';
import { DeleteProdutoService } from '../services/deleteProduto/service/deleteProduto.service';
import { GetProdutosService } from '../services/getProdutos/service/getProdutos.service';
import { GetProdutosOutPutDto } from '../services/getProdutos/dto/getProdutosOutPut.dto';
import { JwtGuards } from 'src/auth/guards/auth.guard';

@Controller('produto')
export class ProdutoController {
    constructor(
        private readonly getProdutos: GetProdutosService,
        private readonly getProdutosByIdService: GetProdutoByIdService,
        private readonly postProdutosService: PostProdutoService,
        private readonly putProdutosService: PutProdutoService,
        private readonly deleteProdutoService: DeleteProdutoService,
    ) {}

    @Get()
    @UseGuards(JwtGuards)
    @ApiOperation({ summary: 'Lista Produtos' })
    @ApiOkResponse({
        description: 'Produtos listados com sucesso!',
    })
    @ApiInternalServerErrorResponse({ description: 'Erro no banco de dados' })
    async listProduto(): Promise<GetProdutosOutPutDto[]> {
        return await this.getProdutos.execute();
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Lista Produto por id' })
    @ApiOkResponse({
        description: 'Produto listado com sucesso!',
    })
    @ApiNotFoundResponse({ description: 'Produto não encontrado' })
    @ApiInternalServerErrorResponse({ description: 'Erro no banco de dados' })
    async listByIdProduto(@Param('id') id: string) {
        return await this.getProdutosByIdService.execute(id);
    }

    @Post()
    @ApiOperation({ summary: 'Produto será criado' })
    @ApiOkResponse({ description: 'Produto criado com sucesso!' })
    @ApiBadRequestResponse({ description: 'Produto já existe' })
    @ApiInternalServerErrorResponse({ description: 'Erro no banco de dados' })
    async createProduto(@Body() data: PostProdutoInputDto) {
        await this.postProdutosService.execute(data);
    }

    @Put('/:id')
    @ApiOperation({ summary: 'Produto será atualizado' })
    @ApiOkResponse({ description: 'Produto atualizado com sucesso!' })
    @ApiNotFoundResponse({ description: 'Produto não encontrado' })
    @ApiInternalServerErrorResponse({ description: 'Erro no banco de dados' })
    async updateProduto(
        @Param('id') id: string,
        @Body() data: PutProdutoInputDto,
    ) {
        await this.putProdutosService.execute(id, data);
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Produto será deletado' })
    @ApiOkResponse({ description: 'Produto deletado com sucesso!' })
    @ApiNotFoundResponse({ description: 'Produto não encontrado' })
    @ApiInternalServerErrorResponse({ description: 'Erro no banco de dados' })
    async deleteProduto(@Param('id') id: string) {
        await this.deleteProdutoService.execute(id);
    }
}
