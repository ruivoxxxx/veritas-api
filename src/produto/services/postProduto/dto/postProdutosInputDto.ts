import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    IsUUID,
    Min,
} from 'class-validator';
import { ProdutoEntity } from 'src/produto/entity/produto.entity';

export class CaracteristicaProdutoDTO {
    @ApiProperty()
    @IsString()
    id: string;

    @IsString()
    @IsNotEmpty({ message: 'Nome da cadasterística não pode ser vazio' })
    nome: string;

    @IsString()
    @IsNotEmpty({ message: 'Descrição da característica não pode ser vazio' })
    descricao: string;

    @ApiProperty()
    produto: ProdutoEntity;
}

export class ImagemProdutoDTO {
    @ApiProperty()
    id: string;

    @IsUrl()
    url: string;

    @IsString()
    @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
    descricao: string;

    @ApiProperty()
    produto: ProdutoEntity;
}
export class PostProdutoInputDto {
    // @ApiProperty()
    // @IsOptional()
    // id: string;

    // @ApiProperty()
    // @IsNotEmpty({ message: 'Id de Usuário não pode ser vazio' })
    // @IsNumber()
    // id_usuario: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Nome do Produto não pode ser vazio' })
    @IsString()
    nome_produto: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty({ message: 'Valor do Produto não pode ser vazio' })
    @Min(1)
    valor_produto: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'Quantidade do Produto não pode ser vazio' })
    @Min(1, { message: 'O valor precisa ser maior que 0' })
    @IsNumber()
    quantidade: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    descricao: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Categoria do Produto não pode ser vazio' })
    @IsString()
    categoria: string;

    // @ApiProperty()
    // caracteristica: CaracteristicaProdutoDTO[];

    // @ApiProperty()
    // imagem: ImagemProdutoDTO[];
}
