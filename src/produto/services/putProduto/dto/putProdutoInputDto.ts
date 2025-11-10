import { Type } from 'class-transformer';
import {
    ArrayMinSize,
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
    ValidateNested,
} from 'class-validator';
import {
    CaracteristicaProdutoDTO,
    ImagemProdutoDTO,
} from '../../postProduto/dto/postProdutosInputDto';
import { ApiProperty } from '@nestjs/swagger';

export class PutProdutoInputDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Id do produto não pode ser vazio' })
    @IsString()
    id: string;

    // @ApiProperty()
    // @IsOptional()
    // id_usuario: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    nome: string;

    @ApiProperty()
    @Min(1)
    @IsOptional()
    valor: number;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    @IsOptional()
    quantidade_disponivel: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    descricao: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    categoria: string;

    @ApiProperty()
    @ValidateNested()
    @IsArray()
    @ArrayMinSize(3)
    @Type(() => CaracteristicaProdutoDTO)
    @IsOptional()
    caracteristicas: CaracteristicaProdutoDTO[];

    @ApiProperty()
    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => ImagemProdutoDTO)
    @IsOptional()
    imagens: ImagemProdutoDTO[];
}
