import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, Min } from 'class-validator';

export class PaginationDTO {
    @ApiProperty({ description: `A página da listagem`, example: '1' })
    @IsNotEmpty()
    @Type(() => Number)
    @Min(1)
    page: number;

    @ApiProperty({
        description: `A quantidade de itens na listagem`,
        example: '10',
    })
    @IsNotEmpty()
    @Type(() => Number)
    @Min(1)
    size: number;

    @ApiProperty({
        description: `A quantidade total de itens na listagem`,
        example: '10',
        required: false,
    })
    @Type(() => Number)
    total?: number;
}
