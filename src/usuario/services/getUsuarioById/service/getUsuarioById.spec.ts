import { describe, expect, it, vi } from 'vitest';
import { GetUsuarioByIdService } from './getUsuarioById.service';
import { GetUsuarioByIdRepository } from '../repository/getUsuarioById.repository';
import { Test, TestingModule } from '@nestjs/testing';
import {
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';

describe('GetUsuarioByIdService', async () => {
    let sut: GetUsuarioByIdService;
    let getUsuarioByIdRepository: GetUsuarioByIdRepository;
    const app: TestingModule = await Test.createTestingModule({
        providers: [
            GetUsuarioByIdService,
            {
                provide: GetUsuarioByIdRepository,
                useValue: {
                    getUsuarioById: vi.fn(),
                },
            },
        ],
    }).compile();
    sut = app.get<GetUsuarioByIdService>(GetUsuarioByIdService);
    getUsuarioByIdRepository = app.get<GetUsuarioByIdRepository>(
        GetUsuarioByIdRepository,
    );

    it('Should be defined', async () => {
        expect(sut).toBeDefined();
        expect(getUsuarioByIdRepository).toBeDefined();
    });

    describe('execute', async () => {
        it('Should be return a user by id', async () => {
            const user = {
                id: '1',
                email: 'CONTATOOJUNIORTAVARES@GMAIL.COM',
                nome: 'Junior',
            };

            //Arrange
            vi.spyOn(
                getUsuarioByIdRepository,
                'getUsuarioById',
            ).mockResolvedValueOnce(user);

            //Act
            const result = await sut.execute('id');

            //Assert
            expect(result).toStrictEqual({
                id: '1',
                email: 'CONTATOOJUNIORTAVARES@GMAIL.COM',
                nome: 'Junior',
            });
        });
        it('Should be throw error not found when search user', async () => {
            const user = {
                id: '1',
                email: 'CONTATOOJUNIORTAVARES@GMAIL.COM',
                nome: 'Junior',
            };

            //Arrange
            vi.spyOn(
                getUsuarioByIdRepository,
                'getUsuarioById',
            ).mockResolvedValueOnce(null);

            //Assert
            expect(sut.execute('1')).rejects.toStrictEqual(
                new NotFoundException('Usuário não encontrado'),
            );
        });
        it('Should be throw a Internal Server Error', async () => {
            vi.spyOn(
                getUsuarioByIdRepository,
                'getUsuarioById',
            ).mockRejectedValueOnce(new Error());

            expect(sut.execute('1')).rejects.toStrictEqual(
                new InternalServerErrorException(),
            );
        });
    });
});
