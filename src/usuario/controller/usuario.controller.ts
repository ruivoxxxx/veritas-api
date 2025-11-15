import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';

import { GetUsuarioService } from '../services/getUsuario/service/getUsuario.service.js';
import { PostUsuarioService } from '../services/postUsuario/service/postUsuario.service.js';
import { GetUsuarioByIdService } from '../services/getUsuarioById/service/getUsuarioById.service.js';
import { PutUsuarioService } from '../services/putUsuario/service/putUsuario.service.js';
import { DeleteUsuarioService } from '../services/deleteUsuario/service/deleteUsuario.service.js';
import { PostUsuarioInputDto } from '../services/postUsuario/dto/postUsuarioInputDto.js';
import { GetUsuarioOutputDto } from '../services/getUsuario/dto/getUsuarioOutputDto.js';
import { PutUsuarioInputDto } from '../services/putUsuario/dto/putUsuarioInputDto.js';
import {
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
} from '@nestjs/swagger';
@Controller('usuario')
export class UsuarioController {
    constructor(
        private readonly postUsuarioService: PostUsuarioService,
        private readonly getUsuarioService: GetUsuarioService,
        private readonly getUsuarioByIdService: GetUsuarioByIdService,
        private readonly putUsuarioService: PutUsuarioService,
        private readonly deleteUsuarioService: DeleteUsuarioService,
    ) {}

    @Post('')
    @ApiOperation({ summary: 'Criação de usuário' })
    @ApiOkResponse({ description: 'Usuário criado com sucesso' })
    @ApiInternalServerErrorResponse({ description: 'Erro no banco de dados' })
    async createUsuario(@Body() data: PostUsuarioInputDto) {
        await this.postUsuarioService.execute(data);
    }

    @Get('')
    @ApiOperation({ summary: 'Lista os usuários existentes' })
    @ApiOkResponse({ description: 'Usuários listados com sucesso!' })
    @ApiInternalServerErrorResponse({ description: 'Erro no banco de dados' })
    async listUsuario(): Promise<GetUsuarioOutputDto[]> {
        return await this.getUsuarioService.execute();
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Lista os usuários existentes' })
    @ApiOkResponse({ description: 'Usuário listado com sucesso!' })
    @ApiInternalServerErrorResponse({ description: 'Erro no banco de dados' })
    async listUsuarioById(@Param('id') id: string) {
        return await this.getUsuarioByIdService.execute(id);
    }

    @Put('/:id')
    @ApiOperation({ summary: 'Atualiza informações de Usuário.' })
    @ApiOkResponse({ description: 'Usuário atualizado com sucesso!' })
    @ApiNotFoundResponse({ description: 'Usuário não encontrado.' })
    @ApiInternalServerErrorResponse({ description: 'Erro no banco de dados.' })
    async putUsuario(
        @Param('id') id: string,
        @Body() data: PutUsuarioInputDto,
    ) {
        await this.putUsuarioService.execute(id, data);
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Deleta informações de Usuário' })
    @ApiOkResponse({ description: 'Usuário deletado com sucesso!' })
    @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
    @ApiInternalServerErrorResponse({ description: 'Erro no banco de dados' })
    async deleteUsuario(@Param('id') id: string) {
        await this.deleteUsuarioService.execute(id);
    }
}
