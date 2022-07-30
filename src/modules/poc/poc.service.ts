import { HttpException, Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserProfile } from './entity/user-profile.entity';
import { UserInfo } from './entity/user-info.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PocService {
  private readonly logger = new Logger(PocService.name);

  constructor(
    // @InjectRepository(UserInfo)
    // private readonly userInfoRepository: Repository<UserInfo>,
    // @InjectRepository(UserProfile)
    // private readonly userProfileRepository: Repository<UserProfile>,
    private dataSource: DataSource,
  ) {}

  //   async createUserProfile(): Promise<UserProfile> {
  //     const userProfile = new UserProfile();
  //     userProfile.GENDER = 'female';
  //     return await this.userProfileRepository.save(userProfile);
  //   }

  //   async createUserInfo(userProfile: UserProfile): Promise<UserInfo> {
  //     const userInfo = new UserInfo();
  //     userInfo.FIRST_NAME = 'Adam';
  //     userInfo.LAST_NAME = 'Smith';
  //     userInfo.userProfile = userProfile;
  //     return await this.userInfoRepository.save(userInfo);
  //   }

  async createRecords(): Promise<void> {
    // try {
    //   //
    //   const userProfileRecord = await this.createUserProfile();
    //   if (userProfileRecord) {
    //     this.logger.debug(userProfileRecord);
    //     this.logger.debug(JSON.stringify(userProfileRecord));
    //     //
    //     const userInfoRecord = await this.createUserInfo(userProfileRecord);
    //     this.logger.debug(userInfoRecord);
    //     this.logger.debug(JSON.stringify(userInfoRecord));
    //   } else {
    //     this.logger.error('do pice ...');
    //   }
    // } catch (error) {
    //   this.logger.error(error);
    //   throw new HttpException('Transaction failed, you have to check your request', 500);
    // }

    await this.dataSource
      .transaction(async (manager) => {
        //
        const userProfile = new UserProfile();
        userProfile.GENDER = 'female';
        await manager.save(userProfile);
        //
        const userInfo = new UserInfo();
        userInfo.FIRST_NAME = 'Adam';
        userInfo.LAST_NAME = 'Smith';
        userInfo.userProfile = userProfile;
        await manager.save(userInfo);
      })
      .catch((err) => {
        this.logger.error(err);
        throw new HttpException('Transaction failed, you have to check your request', 500);
      });
  }
}
