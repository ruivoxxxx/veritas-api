import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class PutUsuarioInputDto {
    @ApiProperty()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    nome: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    email: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    senha: string;
}
