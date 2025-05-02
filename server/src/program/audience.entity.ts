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

@Entity('user_info')
@Unique(['public_key'])
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 44 })
  public_key: string;

  @Index()
  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 200, nullable: true })
  description: string;

  @Column('varchar', { length: 200, nullable: true })
  avatar: string;

  @OneToMany(() => ChannelInfo, (channelInfo) => channelInfo.creator)
  channels: ChannelInfo[];

  @OneToMany(() => EpisodeInfo, (episodeInfo) => episodeInfo.creator)
  episodes: EpisodeInfo[];
}
