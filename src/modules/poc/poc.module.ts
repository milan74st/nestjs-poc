/* istanbul ignore file */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserInfo } from './entity/user-info.entity';
import { UserProfile } from './entity/user-profile.entity';

import { PocService } from './poc.service';
import { PocController } from './poc.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo, UserProfile]), HttpModule],
  providers: [PocService],
  controllers: [PocController],
})
export class PocModule {}
