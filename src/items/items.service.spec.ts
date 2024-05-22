import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from '../schemas/item.schema';

import { ItemsService } from './items.service';

const mockItem = {
  name: 'Test Item',
  description: 'This is a test item',
};

const mockItemModel = {
  create: jest.fn().mockResolvedValue(mockItem),
  find: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValue([mockItem]),
};

describe('ItemsService', () => {
  let service: ItemsService;
  let model: Model<Item>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getModelToken(Item.name),
          useValue: mockItemModel,
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    model = module.get<Model<Item>>(getModelToken(Item.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return all items', async () => {
    const items = await service.findAll();
    expect(items).toEqual([mockItem]);
    expect(model.find).toHaveBeenCalled();
    expect((model.find() as any).exec).toHaveBeenCalled();
  });
});
