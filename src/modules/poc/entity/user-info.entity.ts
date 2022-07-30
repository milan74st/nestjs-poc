import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { UserProfile } from './user-profile.entity';

@Entity({ name: 'USER_INFO' })
export class UserInfo {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  FIRST_NAME: string;

  @Column()
  LAST_NAME: string;

  @Column()
  USER_PROFILE_ID: number;

  @OneToOne(() => UserProfile, (userProfile) => userProfile.userInfo, { cascade: true })
  @JoinColumn({ name: 'USER_PROFILE_ID' })
  userProfile: UserProfile;
}
