import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { EpisodeInfo } from './episode.entity';
import { ChannelInfo } from './channel.entity';

@Entity('rss_feed')
export class RssFeed {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => ChannelInfo)
  @JoinColumn({ name: 'channel_id' })
  channel: ChannelInfo;

  @OneToMany(() => EpisodeInfo, (episode) => episode.rss_feed)
  episodes: EpisodeInfo[];
}
