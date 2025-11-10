import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetPedidoInputDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    id_produto: string;
}
