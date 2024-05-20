import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Address } from '../../addresses/entities/address.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  nome: string;

  @Column({ length: 11 })
  cpf: string;

  @Column({ length: 15 })
  telefone: string;

  @Column({ length: 100 })
  email: string;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];
}
