import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsUUID,
    Matches,
} from 'class-validator';

export class PostUsuarioInputDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nome: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @Matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
            message:
                'A senha deve ter no mínimo 8 digitos, incluindo letra maiúscula,minúscula,numero e caractere especial.',
        },
    )
    @IsNotEmpty()
    @IsString()
    senha: string;
}
