import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    private UsersService: UsersService,
  ) {}

  async findAll(userId: number): Promise<Address[]> {
    return await this.addressRepository.find({
      where: { user: { id: userId } },
    });
  }

  async findOne(id: number): Promise<Address | null> {
    return await this.addressRepository.findOneBy({ id });
  }

  async create(
    userId: number,
    createAddressDto: CreateAddressDto,
  ): Promise<Address> {
    const newAddress = this.addressRepository.create(createAddressDto);
    newAddress.user = await this.UsersService.findOne(+userId);
    await this.addressRepository.save(newAddress);
    delete newAddress.user;
    return newAddress;
  }

  async remove(id: number): Promise<void> {
    await this.addressRepository.delete(id);
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    await this.addressRepository.update(id, updateAddressDto);
    const updatedAddress = await this.addressRepository.findOneBy({ id });
    return updatedAddress;
  }
}
