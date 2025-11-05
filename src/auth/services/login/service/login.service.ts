import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { LoginInputDto } from '../dto/loginInputDto';
import { PostUsuarioRepository } from 'src/usuario/services/postUsuario/repository/postUsuario.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface UserPayload {
    sub: string;
    username: string;
}
@Injectable()
export class AuthService {
    constructor(
        private readonly postUsuarioRepository: PostUsuarioRepository,
        private readonly jwtService: JwtService,
    ) {}

    async execute(data: LoginInputDto) {
        const result = await this.postUsuarioRepository.searchEmail(data.email);

        if (!result) {
            throw new NotFoundException('Usuário não encontrado');
        }

        const pass = await bcrypt.compare(data.senha, result!.senha);

        if (!pass) {
            throw new UnauthorizedException('Email ou senha incorretos');
        }
        const payload: UserPayload = {
            sub: result!.id,
            username: result!.nome,
        };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
