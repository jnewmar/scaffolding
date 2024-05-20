import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    private usersService: UsersService,
  ) {}

  async findAll(userId: number): Promise<Address[]> {
    return this.addressRepository.find({
      where: { user: { id: userId } },
    });
  }

  async findOne(id: number): Promise<Address | null> {
    return this.addressRepository.findOneBy({ id });
  }

  async create(
    userId: number,
    createAddressDto: CreateAddressDto,
  ): Promise<Address> {
    const newAddress = this.addressRepository.create(createAddressDto);
    newAddress.user = await this.usersService.findOne(+userId);
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
