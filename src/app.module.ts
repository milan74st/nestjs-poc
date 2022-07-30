/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configuration } from '../config/configuration';

import { HealthModule } from './modules/health/health.module';
import { PocModule } from './modules/poc/poc.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    //  MySQL
    TypeOrmModule.forRootAsync({
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
    }),
    //  Oracle
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'oracle',
    //     username: configService.get('db.user'),
    //     password: configService.get('db.pass'),
    //     connectString:
    //       '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=' +
    //       configService.get('db.host') +
    //       ')(PORT=' +
    //       +configService.get<number>('db.port') +
    //       '))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=' +
    //       configService.get('db.serviceName') +
    //       ')))',
    //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     // synchronize: true,
    //     logging: ['query', 'error'],
    //   }),
    //   inject: [ConfigService],
    // }),
    HealthModule,
    PocModule,
  ],
})
export class AppModule {}
