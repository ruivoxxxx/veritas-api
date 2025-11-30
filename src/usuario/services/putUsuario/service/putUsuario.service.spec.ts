import { describe, expect, it, vi } from 'vitest';
import { PutUsuarioService } from './putUsuario.service';
import { PutUsuarioRepository } from '../repository/putUsuario.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { PutUsuarioInputDto } from '../dto/putUsuarioInputDto';
import {
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';

describe('PutUsuarioService', async () => {
    let sut: PutUsuarioService;
    let putUsuarioRepository: PutUsuarioRepository;
    const app: TestingModule = await Test.createTestingModule({
        providers: [
            PutUsuarioService,
            {
                provide: PutUsuarioRepository,
                useValue: {
                    buscaUsuario: vi.fn(),
                    atualizaUsuario: vi.fn(),
                },
            },
        ],
    }).compile();
    sut = app.get<PutUsuarioService>(PutUsuarioService);
    putUsuarioRepository = app.get<PutUsuarioRepository>(PutUsuarioRepository);

    it('Should be defined', () => {
        expect(sut).toBeDefined();
        expect(putUsuarioRepository).toBeDefined();
    });

    describe('execute', async () => {
        const user: PutUsuarioInputDto = {
            id: '1',
            nome: 'junior',
            email: 'contatoojuniortavares@gmail.com',
            senha: 'teste',
        };
        it('Should be updated sucessfully', async () => {
            vi.spyOn(
                putUsuarioRepository,
                'buscaUsuario',
            ).mockResolvedValueOnce(true);

            vi.spyOn(
                putUsuarioRepository,
                'atualizaUsuario',
            ).mockResolvedValueOnce(undefined);

            const result = await sut.execute('1', user);

            expect(result).toStrictEqual(undefined);

            expect(putUsuarioRepository.buscaUsuario).toHaveBeenCalledWith('1');

            expect(putUsuarioRepository.atualizaUsuario).toHaveBeenCalledWith(
                user,
            );
        });

        it('Should be throw a BadRequest', async () => {
            vi.spyOn(
                putUsuarioRepository,
                'buscaUsuario',
            ).mockResolvedValueOnce(false);
        });

        expect(sut.execute('1', user)).rejects.toStrictEqual(
            new NotFoundException('Usuário não encontrado!'),
        );

        it('Should be return a internal server', async () => {
            vi.spyOn(
                putUsuarioRepository,
                'buscaUsuario',
            ).mockResolvedValueOnce(true);

            vi.spyOn(
                putUsuarioRepository,
                'atualizaUsuario',
            ).mockRejectedValueOnce(new Error());

            expect(sut.execute('1', user)).rejects.toStrictEqual(
                new InternalServerErrorException(),
            );
        });
    });
});
