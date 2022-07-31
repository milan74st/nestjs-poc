/* istanbul ignore file */
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configuration } from '../config/configuration';

import { HealthModule } from './modules/health/health.module';
import { PocModule } from './modules/poc/poc.module';

let msVersion: DynamicModule;
switch (process.env.MS_VERSION) {
  case 'nestjs-poc-mysql':
    msVersion = TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('db.host'),
        port: configService.get('db.port'),
        username: configService.get('db.user'),
        password: configService.get('db.pass'),
        database: configService.get('db.serviceName'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // synchronize: true,
        logging: ['query', 'error'],
      }),
      inject: [ConfigService],
    });
    break;
  case 'nestjs-poc-oracle':
  case 'nestjs-poc-oracle-oraclelinux':
    msVersion = TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'oracle',
        username: configService.get('db.user'),
        password: configService.get('db.pass'),
        connectString:
          '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=' +
          configService.get('db.host') +
          ')(PORT=' +
          +configService.get<number>('db.port') +
          '))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=' +
          configService.get('db.serviceName') +
          ')))',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // synchronize: true,
        logging: ['query', 'error'],
      }),
      inject: [ConfigService],
    });
    break;
  default:
    break;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    msVersion,
    HealthModule,
    PocModule,
  ],
})
export class AppModule {}
