import { validate } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

describe('CreateUserDto', () => {
  it('should be valid with all fields', async () => {
    const dto = new CreateUserDto();
    dto.email = 'test@example.com';
    dto.nome = 'Test';
    dto.cpf = '12345678901';
    dto.telefone = '123456789';

    const errors = await validate(dto);
    expect(errors.length).toEqual(0);
  });

  it('should be invalid with missing fields', async () => {
    const dto = new CreateUserDto();
    dto.nome = 'Test User';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should be invalid with incorrect email', async () => {
    const dto = new CreateUserDto();
    dto.email = 'invalid email'; // Invalid email
    dto.nome = 'Test';
    dto.cpf = '123456789';
    dto.telefone = '123456789';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should be invalid with incorrect CPF', async () => {
    const dto = new CreateUserDto();
    dto.email = 'test@example.com';
    dto.nome = 'Test';
    dto.cpf = '123'; // Invalid CPF
    dto.telefone = '123456789';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should be invalid with incorrect telefone', async () => {
    const dto = new CreateUserDto();
    dto.email = 'test@example.com';
    dto.nome = 'Test';
    dto.cpf = '123456789';
    dto.telefone = 'invalid telefone'; // Invalid telefone

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
