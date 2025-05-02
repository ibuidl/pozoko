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
import { AudenceInfo } from './audience.entity';
import { ChannelInfo } from './channel.entity';
import { CreatorInfo } from './creator.entity';

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
  create_at: number;

  @Column()
  tip: number;

  @Column()
  is_published: boolean;

  @ManyToOne(() => ChannelInfo, (channelInfo) => channelInfo.episodes)
  channel: ChannelInfo;

  @ManyToOne(() => CreatorInfo, (creatorInfo) => creatorInfo.channels)
  creator: CreatorInfo;

  @ManyToMany(() => AudenceInfo)
  @JoinTable()
  likers: AudenceInfo[];

  @ManyToMany(() => AudenceInfo)
  @JoinTable()
  subscribers: AudenceInfo[];
}
