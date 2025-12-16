import { describe, expect, it, vi } from 'vitest';
import { DeleteUsuarioService } from './deleteUsuario.service';
import { DeleteUsuarioRepository } from '../repository/deleteUsuario.repository';
import { Test, TestingModule } from '@nestjs/testing';
import {
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';

describe('DeleteUsuarioService', async () => {
    let sut: DeleteUsuarioService;
    let deleteUsuarioRepository: DeleteUsuarioRepository;

    const app: TestingModule = await Test.createTestingModule({
        providers: [
            DeleteUsuarioService,
            {
                provide: DeleteUsuarioRepository,
                useValue: {
                    buscaUsuario: vi.fn(),
                    deletaUsuario: vi.fn(),
                },
            },
        ],
    }).compile();
    sut = app.get<DeleteUsuarioService>(DeleteUsuarioService);
    deleteUsuarioRepository = app.get<DeleteUsuarioRepository>(
        DeleteUsuarioRepository,
    );

    it('Should be defined', () => {
        expect(sut).toBeDefined();
        expect(deleteUsuarioRepository).toBeDefined();
    });

    describe('execute', async () => {
        it('Should be deleted sucessfully', async () => {
            vi.spyOn(
                deleteUsuarioRepository,
                'buscaUsuario',
            ).mockResolvedValueOnce(true);
            vi.spyOn(
                deleteUsuarioRepository,
                'deletaUsuario',
            ).mockResolvedValueOnce(undefined);

            const result = await sut.execute('1');

            expect(result).toStrictEqual(undefined);

            expect(deleteUsuarioRepository.buscaUsuario).toHaveBeenCalledWith(
                '1',
            );

            expect(deleteUsuarioRepository.deletaUsuario).toHaveBeenCalledWith(
                '1',
            );
        });
        it('Should be throw a NotFound ', async () => {
            vi.spyOn(
                deleteUsuarioRepository,
                'buscaUsuario',
            ).mockResolvedValueOnce(false);

            expect(sut.execute('1')).rejects.toStrictEqual(
                new NotFoundException('Usuário não encontrado!'),
            );
        });

        it('Should be return a internal server', async () => {
            vi.spyOn(
                deleteUsuarioRepository,
                'buscaUsuario',
            ).mockResolvedValueOnce(true);

            vi.spyOn(
                deleteUsuarioRepository,
                'deletaUsuario',
            ).mockRejectedValueOnce(new Error());

            expect(sut.execute('1')).rejects.toStrictEqual(
                new InternalServerErrorException(),
            );
        });
    });
});
