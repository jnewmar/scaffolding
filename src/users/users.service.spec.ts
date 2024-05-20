import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
    repo.find = jest.fn().mockResolvedValue([]);
    repo.findOneBy = jest.fn().mockResolvedValue({});
    repo.delete = jest.fn().mockResolvedValue({});
    repo.save = jest.fn().mockResolvedValue({});
    repo.update = jest.fn().mockResolvedValue({});
    repo.create = jest.fn().mockReturnValue(new User());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all users', async () => {
    const testUsers: User[] = [];
    jest.spyOn(repo, 'find').mockResolvedValue(testUsers);
    expect(await service.findAll()).toEqual(testUsers);
  });

  it('should find one user', async () => {
    const testUser: User = new User();
    jest.spyOn(repo, 'findOne').mockResolvedValue(testUser);
    expect(await service.findOne(1)).toEqual(testUser);
  });

  it('should remove a user', async () => {
    const spy = jest.spyOn(repo, 'delete').mockResolvedValue({} as any);
    await service.remove(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should create a user', async () => {
    const testUser: User = new User();
    const createUserDto = new CreateUserDto();
    createUserDto.nome = 'Test User';
    createUserDto.email = 'test@example.com';
    createUserDto.nome = 'Test';
    createUserDto.cpf = '123456789';
    createUserDto.telefone = '123456789';

    jest.spyOn(repo, 'save').mockResolvedValue(testUser);
    expect(await service.create(createUserDto)).toEqual(testUser);
  });

  it('should update a user', async () => {
    const testUser: User = new User();
    const updateUserDto = {
      name: 'Updated User',
      email: 'updated@example.com',
    };
    jest.spyOn(repo, 'save').mockResolvedValue(testUser);
    expect(await service.update(1, updateUserDto)).toEqual(testUser);
  });
});
