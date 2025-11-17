import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { PostUsuarioInputDto } from '../dto/postUsuarioInputDto';
import { PostUsuarioRepository } from '../repository/postUsuario.repository';
import * as bcrypt from 'bcrypt';
@Injectable()
export class PostUsuarioService {
    constructor(
        private readonly postUsuarioRepository: PostUsuarioRepository,
    ) {}

    async execute(data: PostUsuarioInputDto) {
        try {
            const result = await this.postUsuarioRepository.searchEmail(
                data.email,
            );

            if (result) {
                throw new BadRequestException('Email já está sendo utilizado');
            }
            data.senha = await bcrypt.hash(data.senha, await bcrypt.genSalt());

            await this.postUsuarioRepository.createUsuario(data);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
