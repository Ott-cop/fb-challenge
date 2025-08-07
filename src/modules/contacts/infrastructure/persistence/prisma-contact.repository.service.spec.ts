import { Test, TestingModule } from '@nestjs/testing';
import { PrismaContactRepository } from './prisma-contact.repository.service';

describe('PrismaContactRepositoryService', () => {
  let service: PrismaContactRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaContactRepository],
    }).compile();

    service = module.get<PrismaContactRepository>(PrismaContactRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
