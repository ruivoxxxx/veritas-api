import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { DeleteUsuarioRepository } from '../repository/deleteUsuario.repository';

@Injectable()
export class DeleteUsuarioService {
    constructor(
        private readonly deleteUsuarioRepository: DeleteUsuarioRepository,
    ) {}
    async execute(id: string) {
        try {
            const usuario = await this.deleteUsuarioRepository.buscaUsuario(id);
            if (!usuario) {
                throw new NotFoundException('Usuário não encontrado');
            }

            return await this.deleteUsuarioRepository.deletaUsuario(id);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException(error.message);
        }
    }
}
