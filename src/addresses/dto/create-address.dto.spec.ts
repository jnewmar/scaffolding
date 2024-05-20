import { validate } from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

describe('CreateAddressDto', () => {
  it('should be valid with all fields', async () => {
    const dto = new CreateAddressDto();
    dto.logradouro = 'Test Street';
    dto.numero = '123';
    dto.bairro = 'Test Neighborhood';
    dto.cidade = 'Test City';
    dto.estado = 'Test State';

    const errors = await validate(dto);
    expect(errors.length).toEqual(0);
  });

  it('should be invalid with missing fields', async () => {
    const dto = new CreateAddressDto();

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should be invalid with fields that are too long', async () => {
    const dto = new CreateAddressDto();
    dto.logradouro = 'a'.repeat(501);
    dto.numero = 'a'.repeat(11);
    dto.bairro = 'a'.repeat(101);
    dto.cidade = 'a'.repeat(101);
    dto.estado = 'a'.repeat(101);

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should be invalid with fields that are not strings', async () => {
    const dto = new CreateAddressDto();
    dto.logradouro = 123 as any;
    dto.numero = 123 as any;
    dto.bairro = 123 as any;
    dto.cidade = 123 as any;
    dto.estado = 123 as any;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
