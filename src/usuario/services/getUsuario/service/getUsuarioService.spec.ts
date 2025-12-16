import { Test, TestingModule } from '@nestjs/testing';
import { describe, expect, it, vi } from 'vitest';

import { GetUsuarioRepository } from '../repository/getUsuario.repository.js';
import { GetUsuarioService } from './getUsuario.service.js';
import { InternalServerErrorException } from '@nestjs/common';

describe('GetUsuarioService', async () => {
    let sut: GetUsuarioService;
    let getUsuarioRepository: GetUsuarioRepository;
    const app: TestingModule = await Test.createTestingModule({
        providers: [
            GetUsuarioService,
            {
                provide: GetUsuarioRepository,
                useValue: {
                    getUsuarios: vi.fn(),
                },
            },
        ],
    }).compile();
    sut = app.get<GetUsuarioService>(GetUsuarioService);
    getUsuarioRepository = app.get<GetUsuarioRepository>(GetUsuarioRepository);

    it('Should be defined', () => {
        expect(sut).toBeDefined();
        expect(getUsuarioRepository).toBeDefined();
    });

    describe('execute', () => {
        it('Should be return users with id,email,nome', async () => {
            //Arrange
            const users = [
                {
                    id: '1',
                    email: 'junior@gmail.com',
                    nome: 'junior',
                },
            ];

            vi.spyOn(getUsuarioRepository, 'getUsuarios').mockResolvedValueOnce(
                users,
            );

            //Act
            const result = await sut.execute();

            //Assert
            expect(getUsuarioRepository.getUsuarios).toHaveBeenCalledWith();

            expect(result).toStrictEqual([
                { id: '1', email: 'junior@gmail.com', nome: 'junior' },
            ]);
        });

        it('Should be throw a Internal Server Error', async () => {
            vi.spyOn(getUsuarioRepository, 'getUsuarios').mockRejectedValueOnce(
                new Error(),
            );

            expect(sut.execute()).rejects.toStrictEqual(
                new InternalServerErrorException(),
            );
        });
    });
});
