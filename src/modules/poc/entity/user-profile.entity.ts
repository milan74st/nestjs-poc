import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { UserInfo } from './user-info.entity';

@Entity({ name: 'USER_PROFILE' })
export class UserProfile {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  GENDER: string;

  @OneToOne(() => UserInfo, (userInfo) => userInfo.userProfile)
  userInfo: UserInfo;
}
