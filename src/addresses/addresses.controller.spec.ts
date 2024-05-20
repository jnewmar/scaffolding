import { Test, TestingModule } from '@nestjs/testing';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

describe('AddressesController', () => {
  let controller: AddressesController;
  let addressesService: AddressesService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressesController],
      providers: [
        {
          provide: AddressesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<AddressesController>(AddressesController);
    addressesService = module.get<AddressesService>(AddressesService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an address', async () => {
      const addressDto = {
        logradouro: 'Test Street',
        numero: '1',
        cidade: 'Test City',
        estado: 'TS',
        bairro: '12345',
      };
      const result = { id: 1, user: {} as User, ...addressDto };
      jest.spyOn(addressesService, 'create').mockResolvedValue(result);

      expect(await controller.create('1', addressDto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of addresses', async () => {
      const result = [
        {
          id: 1,
          logradouro: 'Test Street',
          numero: '1',
          cidade: 'Test City',
          estado: 'TS',
          bairro: '12345',
          user: {} as User,
        },
      ];
      jest.spyOn(addressesService, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll('1')).toBe(result);
    });
  });

  describe('update', () => {
    it('should update an address', async () => {
      const addressDto = {
        logradouro: 'Test Street',
        numero: '1',
        cidade: 'Test City',
        estado: 'TS',
        bairro: '12345',
        user: {} as User,
      };
      const result = { id: 1, ...addressDto };
      jest.spyOn(addressesService, 'update').mockResolvedValue(result);

      expect(await controller.update('1', '1', addressDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should delete an address', async () => {
      jest.spyOn(addressesService, 'remove').mockResolvedValue();

      expect(await controller.remove('1', '1')).toBeUndefined();
    });
  });
});
