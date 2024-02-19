import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { URLService } from './url.service';
import { NewURL } from 'src/graphql.schema';
import * as uniqueExtensionCreator from '../services/uniqueExtensionCreator';

describe('URLService', () => {
    let service: URLService;
    let prismaServiceMock;

    
    beforeEach(async () => {
        jest.spyOn(uniqueExtensionCreator, 'uniqueExtensionCreator').mockReturnValue('uniqueShortURL')
        prismaServiceMock = {
            uRL: {
                findUnique: jest.fn(),
                create: jest.fn(),
                delete: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                URLService,
                {
                    provide: PrismaService,
                    useValue: prismaServiceMock,
                },
            ],
        }).compile();

        service = module.get<URLService>(URLService);
    });

    describe('create', () => {
        it('should create a new URL', async () => {
            const input: NewURL = { longURL: 'http://example.com' };
            const expectedURL = { longURL: input.longURL, shortURL: 'uniqueShortURL' };
            prismaServiceMock.uRL.create = jest.fn().mockResolvedValue(expectedURL);

            const result = await service.create(input);

            expect(result).toEqual(expectedURL);
            expect(prismaServiceMock.uRL.create).toHaveBeenCalledWith({ data: expectedURL });
        });

        it('should throw BadRequestException for duplicate URL', async () => {
            const input: NewURL = { longURL: 'http://example.com' };
            prismaServiceMock.uRL.create = jest.fn().mockImplementation(() => {
                throw { code: 'P2002', meta: { target: ['longURL'] } };
            });

            await expect(service.create(input)).rejects.toThrow(BadRequestException);
        });
    });

    describe('findOne', () => {
        it('should find unique shortURL', async()=>{
            const input: string = 'uniqueShortURL';
            const expectedURL = { shortURL: 'uniqueShortURL' };
            prismaServiceMock.uRL.findUnique = jest.fn().mockResolvedValue(expectedURL);

            const result = await service.findOne(input);

            expect(result).toEqual(expectedURL);
            expect(prismaServiceMock.uRL.findUnique).toHaveBeenCalledWith({ where: expectedURL });
        })
    });

    describe('delete', () => {
        it('should delete URL', async()=>{
            const input: string = 'uniqueLongURL';
            const expectedURL = { longURL: 'uniqueLongURL' };
            prismaServiceMock.uRL.delete = jest.fn().mockResolvedValue(expectedURL);

            const result = await service.delete(input);

            expect(result).toEqual(expectedURL);
            expect(prismaServiceMock.uRL.delete).toHaveBeenCalledWith({ where: expectedURL });
        })
    });
});
