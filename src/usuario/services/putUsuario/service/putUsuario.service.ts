import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PutUsuarioInputDto } from '../dto/putUsuarioInputDto';
import { PutUsuarioRepository } from '../repository/putUsuario.repository';
@Injectable()
export class PutUsuarioService {
    constructor(private readonly putUsuarioRepository: PutUsuarioRepository) {}
    async execute(id: string, data: PutUsuarioInputDto) {
        try {
            const usuario = await this.putUsuarioRepository.buscaUsuario(id);
            if (!usuario) {
                throw new NotFoundException('Usuário não encontrado.');
            }

            await this.putUsuarioRepository.atualizaUsuario(data);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException(error.message);
        }
    }
}
