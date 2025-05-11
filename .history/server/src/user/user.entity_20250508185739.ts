import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ChannelInfo } from '../channel/channel.entity';
import { EpisodeInfo } from '../program/episode.entity';

export enum UserRole {
  Creator = 0,
  Listener = 1,
  Both = 2,
}

@Entity('user_info')
@Unique(['public_key'])
@Index('idx_usertor_name', ['nickname'])
export class UserInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 44 })
  public_key: string;

  @Column('varchar', { length: 44 })
  owner: string;

  @Index()
  @Column('varchar', { length: 20 })
  nickname: string;

  @Column('varchar', { length: 200, nullable: true })
  description: string;

  @Column('varchar', { length: 200, nullable: true })
  avatar: string;

  @Column({
    type: 'bigint',
  })
  created_at: number;

  @Column('varchar', { length: 100, nullable: true, default: null })
  email: string;

  @Column({ default: false })
  is_frozen: boolean;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.Listener,
  })
  role: UserRole;

  // as a creator
  @OneToMany(() => ChannelInfo, (channelInfo) => channelInfo.main_creator)
  channels: ChannelInfo[];

  @OneToMany(() => EpisodeInfo, (episodeInfo) => episodeInfo.creator)
  episodes: EpisodeInfo[];

  @Column({ default: 0 })
  total_viewers: number;

  @Column({ default: 0 })
  total_subscribers: number;

  @Column({ default: 0 })
  total_episodes_published: number;

  // as a listener
  @ManyToMany(() => ChannelInfo, (channel) => channel.likers)
  @JoinTable()
  liked_channels: ChannelInfo[];

  @ManyToMany(() => EpisodeInfo, (episode) => episode.likers)
  liked_episodes: EpisodeInfo[];

  @ManyToMany(() => ChannelInfo, (channel) => channel.subscribers)
  @JoinTable()
  subscribed_channels: ChannelInfo[];
}
