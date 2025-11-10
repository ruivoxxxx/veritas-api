import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';
import { UsuarioEntity } from 'src/usuario/entity/usuario.entity';

class ItemPedidoDto {
    @ApiProperty()
    @IsUUID()
    produtoId: string;

    @ApiProperty()
    @IsNumber()
    quantidade: number;
}
export class PostPedidoInputDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    valor_total?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    status?: string;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    itens_pedido: ItemPedidoDto[];

    @ApiProperty()
    usuario: UsuarioEntity;
}
