import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ChannelInfo } from './channel.entity';
import { UserInfo } from './user.entity';

@Entity('ep_info')
@Unique('uni_metadata_cid', ['metadata_cid'])
@Index('idx_ep_name', ['name'])
@Index('idx_channel_key', ['channel'])
export class EpisodeInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 20 })
  name: string;

  @Column('varchar', { length: 10 })
  symbol: string;

  @Column('varchar', { length: 200 })
  metadata_cid: string;

  @Column()
  created_at: number;

  @Column({ default: 0 })
  reward: number;

  @Column({ default: false })
  is_published: boolean;

  @ManyToOne(() => ChannelInfo, (channelInfo) => channelInfo.episodes)
  channel: ChannelInfo;

  @Column({ nullable: false })
  channel_id: number;

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.channels)
  creator: UserInfo;

  @ManyToMany(() => UserInfo)
  @JoinTable()
  likers: UserInfo[];

  @ManyToMany(() => UserInfo)
  @JoinTable()
  subscribers: UserInfo[];
}
