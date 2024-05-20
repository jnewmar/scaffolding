import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOneBy: jest.fn().mockResolvedValue({}),
            delete: jest.fn().mockResolvedValue({}),
            save: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();
    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call usersService.create with correct parameters', async () => {
      const createUserDto = new CreateUserDto();
      const serviceSpy = jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve({} as User));

      await controller.create(createUserDto);

      expect(serviceSpy).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should call usersService.findAll', async () => {
      const serviceSpy = jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve({} as User[]));

      await controller.findAll();

      expect(serviceSpy).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call usersService.findOne with correct parameters', async () => {
      const id = '1';
      const serviceSpy = jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => Promise.resolve({} as User));

      await controller.findOne(id);

      expect(serviceSpy).toHaveBeenCalledWith(+id);
    });
  });

  describe('update', () => {
    it('should call usersService.update with correct parameters', async () => {
      const id = '1';
      const updateUserDto = new UpdateUserDto();
      const serviceSpy = jest
        .spyOn(service, 'update')
        .mockImplementation(() => Promise.resolve({} as User)); // Fix: Return an empty User object

      await controller.update(id, updateUserDto);

      expect(serviceSpy).toHaveBeenCalledWith(+id, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should call usersService.remove with correct parameters', async () => {
      const id = '1';
      const serviceSpy = jest
        .spyOn(service, 'remove')
        .mockImplementation(() => Promise.resolve());

      await controller.remove(id);

      expect(serviceSpy).toHaveBeenCalledWith(+id);
    });
  });
});
