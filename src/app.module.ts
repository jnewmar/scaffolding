import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import 'dotenv/config';
import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';
import { Address } from './addresses/entities/address.entity';
import { User } from './users/entities/user.entity';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis de ambiente acessíveis globalmente
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get<string>('MONGO_DB_USER')}:${configService.get<string>('MONGO_DB_PASS')}@${configService.get<string>('MONGO_DB_HOST')}:${configService.get<string>('MONGO_DB_PORT')}/${configService.get<string>('MONGO_DB_NAME')}?authSource=admin`,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.RDS_HOSTNAME,
      username: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      port: parseInt(process.env.RDS_PORT),
      database: process.env.RDS_DBNAME,
      entities: [User, Address],
      synchronize: true,
    }),
    UsersModule,
    AddressesModule,
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
