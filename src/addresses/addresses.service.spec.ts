import { Test, TestingModule } from '@nestjs/testing';
import { AddressesService } from './addresses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

describe('AddressesService', () => {
  let service: AddressesService;
  let repo: Repository<Address>;
  let userRepo: Repository<User>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressesService,
        { provide: getRepositoryToken(Address), useClass: Repository },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        UsersService,
      ],
    }).compile();

    service = module.get<AddressesService>(AddressesService);
    repo = module.get<Repository<Address>>(getRepositoryToken(Address));
    repo.find = jest.fn().mockResolvedValue([]);
    repo.findOneBy = jest.fn().mockResolvedValue({});
    repo.delete = jest.fn().mockResolvedValue({});
    repo.save = jest.fn().mockResolvedValue({});
    repo.update = jest.fn().mockResolvedValue({});
    repo.create = jest.fn().mockReturnValue(new Address());

    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
    userRepo.findOneBy = jest.fn().mockResolvedValue({});
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of addresses', async () => {
      const testAddress: Address = new Address();
      jest.spyOn(repo, 'find').mockResolvedValueOnce([testAddress]);

      const addresses = await service.findAll(1);
      expect(addresses).toEqual([testAddress]);
    });
  });

  describe('findOne', () => {
    it('should get a single address', async () => {
      const testAddress: Address = new Address();
      jest.spyOn(repo, 'findOneOrFail').mockResolvedValueOnce(testAddress);

      const address = await service.findOne(1);
      expect(address).toEqual(testAddress);
    });
  });

  describe('create', () => {
    it('should successfully insert an address', async () => {
      const testAddress: Address = new Address();
      jest.spyOn(repo, 'create').mockReturnValue(testAddress);
      jest.spyOn(repo, 'save').mockResolvedValue(testAddress);

      const newAddress = await service.create(1, {
        logradouro: 'Test Street',
        cidade: 'Test City',
        estado: 'TS',
        bairro: '12345',
        numero: '12',
      });
      expect(newAddress).toEqual(testAddress);
    });
  });

  describe('remove', () => {
    it('should delete an address', async () => {
      const spy = jest.spyOn(repo, 'delete').mockResolvedValue({} as any);
      await service.remove(1);
      expect(spy).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update an address', async () => {
      const testAddress: Address = new Address();
      jest.spyOn(repo, 'preload').mockResolvedValue(testAddress);
      jest.spyOn(repo, 'save').mockResolvedValue(testAddress);

      const updatedAddress = await service.update(1, {
        logradouro: 'Test Street',
        numero: '123',
        cidade: 'Test City',
        estado: 'TS',
        bairro: '12345',
      });
      expect(updatedAddress).toEqual(testAddress);
    });
  });
});
