import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GetUsuarioRepository } from '../repository/getUsuario.repository';
import { GetUsuarioOutputDto } from '../dto/getUsuarioOutputDto';

@Injectable()
export class GetUsuarioService {
    constructor(private readonly getUsuarioRepository: GetUsuarioRepository) {}

    async execute(): Promise<GetUsuarioOutputDto[]> {
        try {
            return await this.getUsuarioRepository.getUsuarios();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
