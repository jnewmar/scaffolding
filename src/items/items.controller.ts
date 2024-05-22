import { Controller, Get, Post, Body } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from '../schemas/item.schema';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async create(
    @Body('name') name: string,
    @Body('description') description: string,
  ): Promise<Item> {
    return this.itemsService.createItem(name, description);
  }

  @Get()
  async findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }
}
