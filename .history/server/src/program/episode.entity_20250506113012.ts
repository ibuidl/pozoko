import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ChannelInfo } from './channel.entity';
import { UserInfo } from './user.entity';

export enum AudioMimeType {
  MP3 = 'audio/mpeg',
  WAV = 'audio/wav',
  AAC = 'audio/aac',
  OGG = 'audio/ogg',
  M4A = 'audio/mp4',
}

@Entity('ep_info')
@Unique('uni_metadata_cid', ['metadata_cid'])
@Index('idx_ep_name', ['name'])
@Index('idx_channel_key', ['channel'])
export class EpisodeInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 20 })
  name: string;

  @Column('varchar', { length: 10 })
  symbol: string;

  @Column('varchar', { length: 200 })
  metadata_cid: string;

  @Column({
    type: 'bigint',
  })
  created_at: number;

  @Column('varchar', { length: 200, nullable: true })
  description: string;

  @Column({ type: 'bigint', default: 0 })
  reward: number;

  @Column({ type: 'bigint', default: 0 })
  fileSize: number;

  @Column({
    type: 'enum',
    enum: AudioMimeType,
    default: AudioMimeType.MP3,
    comment: 'Audio file mime type',
  })
  mimeType: AudioMimeType;

  @Column({
    type: 'int',
    nullable: true,
    comment: 'how many seconds',
  })
  duration: number;

  @Column({ default: false })
  is_published: boolean;

  @Column({
    type: 'bigint',
    nullable: true,
  })
  pubDate: number;

  @ManyToOne(() => ChannelInfo, (channelInfo) => channelInfo.episodes)
  @JoinColumn({ name: 'channel_id', referencedColumnName: 'id' })
  channel: ChannelInfo;

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.channels)
  @JoinColumn({ name: 'creator_id', referencedColumnName: 'id' })
  creator: UserInfo;

  @Column('varchar', { name: 'channel_id', length: 36, nullable: false })
  channel_id: string;

  @Column('varchar', { name: 'creator_id', length: 36, nullable: false })
  creator_id: string;

  @ManyToOne(() => RssFeed, (rss_feed) => rss_feed.episodes)
  @JoinColumn({ name: 'rss_feed_id' })
  rss_feed: RssFeed;

  @ManyToMany(() => UserInfo)
  @JoinTable()
  likers: UserInfo[];

  @ManyToMany(() => UserInfo)
  @JoinTable()
  subscribers: UserInfo[];
}
