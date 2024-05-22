import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

const mockItem = {
  name: 'Test Item',
  description: 'This is a test item',
};

const mockItemsService = {
  createItem: jest.fn().mockResolvedValue(mockItem),
  findAll: jest.fn().mockResolvedValue([mockItem]),
};

describe('ItemsController', () => {
  let controller: ItemsController;
  let service: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [
        {
          provide: ItemsService,
          useValue: mockItemsService,
        },
      ],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an item', async () => {
    const newItem = await controller.create('Test Item', 'This is a test item');
    expect(newItem).toEqual(mockItem);
    expect(service.createItem).toHaveBeenCalledWith(
      'Test Item',
      'This is a test item',
    );
  });

  it('should return all items', async () => {
    const items = await controller.findAll();
    expect(items).toEqual([mockItem]);
    expect(service.findAll).toHaveBeenCalled();
  });
});
