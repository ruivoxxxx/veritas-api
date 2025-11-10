import { ApiProperty } from '@nestjs/swagger';

export class GetProdutosOutPutDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    nome: string;

    @ApiProperty()
    valor: number;

    @ApiProperty()
    descricao: string;

    @ApiProperty()
    categoria: string;
}
