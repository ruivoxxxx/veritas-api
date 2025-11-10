import { ApiProperty } from '@nestjs/swagger';

export class GetUsuarioOutputDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    nome: string;

    @ApiProperty()
    email: string;
}
