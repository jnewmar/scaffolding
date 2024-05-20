
## Install and set node 18

nvm install 18
nvm use v18.20.2

## Install nest globaly

npm i -g @nestjs/cli

## Creating Initial code based on mest starter code
´´´´
git clone https://github.com/nestjs/typescript-starter.git upay
cd upay
npm install
npm run start

ctrl + C
´´´´

## Installing typeORM and postgres driver 

npm install --save @nestjs/typeorm typeorm pg


## Setting connection

https://docs.nestjs.com/techniques/database

https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create-deploy-nodejs.rds.html

https://typeorm.io/data-source-options#postgres--cockroachdb-data-source-options

### AWS RDS integration

https://repost.aws/pt/knowledge-center/users-connect-rds-iam

https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-rds-signer/

´´´´
src/app.module.ts

    TypeOrmModule.forRoot({
      type: 'postgres',
      host     : process.env.RDS_HOSTNAME,
      username : process.env.RDS_USERNAME,
      password : process.env.RDS_PASSWORD,
      port     : parseInt(process.env.RDS_PORT),
      database:   process.env.RDS_DBNAME,
      entities: [],
      synchronize: true,
    }),
´´´´

## Set swagger

npm i @nestjs/swagger

´´´´
 src/main.ts

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

 const config = new DocumentBuilder()
    .setTitle('Upay')
    .setDescription('Upay API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

´´´´



## Set dot env

 npm i dotenv

 ´´´´
 src/main.ts


import 'dotenv/config';
 ´´´´
## Set class-validator for validations

npm install class-validator

## Set eslint

npm i eslint eslint-config-airbnb-base eslint-plugin-import eslint-plugin-promise prettier-eslint-cli

Also it was necessary adjust some rules to work with some the nest.js patterns


## Run a local postgres

	
docker run --name upay-postgres -p 5432:5432 -e POSTGRES_PASSWORD=123456 -e POSTGRES_USER=upay -e POSTGRES_DB=upay  -d postgres

Pgadmin client
https://www.postgresql.org/download/