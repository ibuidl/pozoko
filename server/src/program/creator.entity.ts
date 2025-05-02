import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ChannelInfo } from './channel.entity';
import { EpisodeInfo } from './episode.entity';

@Entity('creator_info')
@Unique(['public_key'])
@Index('idx_creator_name', ['nickname'])
export class CreatorInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 44 })
  public_key: string;

  @Column('varchar', { length: 44 })
  owner: string;

  @Index()
  @Column('varchar', { length: 20 })
  nickname: string;

  @Column('varchar', { length: 200, nullable: true })
  description: string;

  @Column('varchar', { length: 200 })
  avatar: string;

  @Column()
  is_frozen: boolean;

  @Column()
  total_viewers: number;

  @OneToMany(() => ChannelInfo, (channelInfo) => channelInfo.main_creator)
  channels: ChannelInfo[];

  @OneToMany(() => EpisodeInfo, (episodeInfo) => episodeInfo.creator)
  episodes: EpisodeInfo[];
}
