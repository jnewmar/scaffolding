import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from '../schemas/item.schema';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<Item>) {}

  async createItem(name: string, description: string): Promise<Item> {
    const newItem = await this.itemModel.create({ name, description });
    return newItem;
  }

  async findAll(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }
}
