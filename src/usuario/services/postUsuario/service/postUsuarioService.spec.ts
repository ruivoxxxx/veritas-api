import { describe, expect, it, vi } from 'vitest';
import { PostUsuarioService } from './postUsuario.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PostUsuarioRepository } from '../repository/postUsuario.repository';
import { PostUsuarioInputDto } from '../dto/postUsuarioInputDto';

describe('GetUsuarioByIdService', async () => {
    let sut: PostUsuarioService;
    let postUsuarioRepository: PostUsuarioRepository;
    const app: TestingModule = await Test.createTestingModule({
        providers: [
            PostUsuarioService,
            {
                provide: PostUsuarioRepository,
                useValue: {
                    searchEmail: vi.fn(),
                    createUsuario: vi.fn(),
                },
            },
        ],
    }).compile();
    sut = app.get<PostUsuarioService>(PostUsuarioService);
    postUsuarioRepository = app.get<PostUsuarioRepository>(
        PostUsuarioRepository,
    );

    it('Should be defined', () => {
        expect(sut).toBeDefined();
        expect(postUsuarioRepository).toBeDefined();
    });

    describe('PostUsuarioService', async () => {
        it('Should be create user sucessfully', async () => {
            const user: PostUsuarioInputDto = {
                nome: 'junior',
                email: 'CONTATOOJUNIORTAVARES@GMAIL.COM',
                senha: 'senhasenha',
            };

            vi.spyOn(
                postUsuarioRepository,
                'searchEmail',
            ).mockResolvedValueOnce(false);

            vi.spyOn(
                postUsuarioRepository,
                'createUsuario',
            ).mockResolvedValueOnce(undefined);

            const result = await sut.execute(user);

            expect(postUsuarioRepository.searchEmail).toHaveBeenCalledWith(
                'CONTATOOJUNIORTAVARES@GMAIL.COM',
            );

            expect(result).toStrictEqual(undefined);
        });

        it('Should be exist user', async());
    });
});
