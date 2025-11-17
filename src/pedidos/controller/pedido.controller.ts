import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { PostPedidoService } from '../services/postPedido/service/postPedido.service';
import {
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
} from '@nestjs/swagger';
import { GetPedidoService } from '../services/getPedido/service/getPedido.service';
import { GetPedidoInputDto } from '../services/getPedido/dto/getPedidoInputDto';
import { PostPedidoInputDto } from '../services/postPedido/dto/postPedidoInputDto';
import { JwtGuards } from 'src/auth/guards/auth.guard';
import type { RequestUser } from 'src/auth/guards/auth.guard';
@Controller('pedidos')
export class PedidoController {
    constructor(
        private readonly pedidoService: PostPedidoService,
        private readonly getPedidoService: GetPedidoService,
    ) {}

    @Post('')
    @UseGuards(JwtGuards)
    @ApiOperation({ summary: 'Criação de Pedido' })
    @ApiOkResponse({ description: 'Pedido criado com sucesso!' })
    @ApiNotFoundResponse({
        description: 'Usuário não encontrado || Produto não encontrado',
    })
    @ApiInternalServerErrorResponse({ description: 'Erro no banco de dados' })
    async criaPedidos(
        @Req() req: RequestUser,
        @Body() data: PostPedidoInputDto,
    ) {
        const usuario_id = req.usuario.sub;
        return await this.pedidoService.execute(usuario_id, data);
    }

    @Get('')
    // @UseGuards(JwtGuards)
    @ApiOperation({ summary: 'Busca de pedido por Id' })
    @ApiOkResponse({ description: 'Pedido encontrado com sucesso!' })
    @ApiInternalServerErrorResponse({ description: 'Erro no banco de dados' })
    async buscaProduto(@Query() data: GetPedidoInputDto) {
        return await this.getPedidoService.execute(data);
    }
}
