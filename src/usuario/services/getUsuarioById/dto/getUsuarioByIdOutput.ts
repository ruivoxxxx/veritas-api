import { ApiProperty } from '@nestjs/swagger';

export class GetUsuarioByIdOutputDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    nome: string;

    @ApiProperty()
    email: string;
}

