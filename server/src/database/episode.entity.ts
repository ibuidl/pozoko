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

  @Column('varchar', { length: 20 })
  symbol: string;

  @Column('varchar', { length: 50 })
  metadata_cid: string;

  @Column()
  create_at: number;

  @ManyToOne(() => ChannelInfo, (channelInfo) => channelInfo.episodes)
  channel: ChannelInfo;

  @Column()
  tip: number;

  @Column()
  is_published: boolean;

  @Index()
  @ManyToOne(() => UserInfo, (userInfo) => userInfo.channels)
  creator: UserInfo;

  @ManyToMany(() => UserInfo)
  @JoinTable()
  likers: UserInfo[];

  @ManyToMany(() => UserInfo)
  @JoinTable()
  subscribers: UserInfo[];
}
