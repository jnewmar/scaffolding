import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import {
  CreateAddressDto,
  CreateAddressDtoWithId,
} from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { UsersService } from '../users/users.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('addresses')
@Controller('users/:userId/addresses')
export class AddressesController {
  constructor(
    private readonly addressesService: AddressesService,
    private readonly usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Create address' })
  @ApiResponse({
    status: 201,
    type: CreateAddressDtoWithId,
    description: 'The address has been successfully created.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'The id of the user',
  })
  @Post()
  async create(
    @Param('userId') user_id: string,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    const user = await this.usersService.findOne(+user_id);
    if (!user) {
      throw new NotFoundException('User not found posts');
    }
    return await this.addressesService.create(+user_id, createAddressDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all addresses' })
  @ApiResponse({
    status: 200,
    type: [CreateAddressDtoWithId],
    description: 'The addresses have been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'The id of the user',
  })
  async findAll(@Param('userId') user_id: string) {
    const user = await this.usersService.findOne(+user_id);
    if (!user) {
      throw new NotFoundException('User not found get');
    }
    return await this.addressesService.findAll(+user_id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update address' })
  @ApiResponse({
    status: 200,
    type: CreateAddressDtoWithId,
    description: 'The address has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'User/Address not found.' })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'The id of the user',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The id of the address',
  })
  async update(
    @Param('userId') user_id,
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    const user = await this.usersService.findOne(+user_id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const address = await this.addressesService.findOne(+id);
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return await this.addressesService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete address' })
  @ApiResponse({
    status: 200,
    description: 'The address has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'User/Address not found.' })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'The id of the user',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The id of the address',
  })
  async remove(@Param('userId') user_id, @Param('id') id: string) {
    const user = await this.usersService.findOne(+user_id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const address = await this.addressesService.findOne(+id);
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return await this.addressesService.remove(+id);
  }
}
