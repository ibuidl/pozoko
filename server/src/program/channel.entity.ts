import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserInfo } from './user.entity';
import { EpisodeInfo } from './episode.entity';

export enum TypeOfCost {
  Free = 0,
  Paid = 1,
}

export interface Creators {
  address: string;
  share: number;
  verified: boolean;
}

@Entity()
@Unique(['public_key'])
@Index('idx_channel_name', ['name'])
@Index('idx_channel_symbol', ['symbol'])
@Index('idx_category_symbol', ['category'])
export class ChannelInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 20 })
  name: string;

  @Column('varchar', { length: 10 })
  symbol: string;

  @Column('varchar', { length: 100, nullable: true })
  description: string;

  @Column('varchar', { length: 200, nullable: true })
  avatar: string;

  @Column('varchar', { length: 44 })
  public_key: string;

  @Column('varchar', { length: 44 })
  nft_mint_account: string;

  @Column({ default: 'en' })
  language: string;

  @Column({ default: 'episodic' })
  itunesType: string;

  @Column({
    type: 'bigint',
    default: 0,
  })
  created_at: number;

  @Column({ nullable: true, default: '' })
  category: string;

  @Column({ nullable: true, default: '' })
  subcategory: string;

  @Column({ default: 0 })
  num_of_audios: number;

  @Column({ default: false })
  is_enabled: boolean;

  @Column({
    type: 'enum',
    enum: TypeOfCost,
    default: TypeOfCost.Free,
  })
  type_of_cost: TypeOfCost;

  @Column({ type: 'bigint', default: 0 })
  nft_mint_amount: number;

  @OneToMany(() => EpisodeInfo, (episodeInfo) => episodeInfo.channel)
  episodes: EpisodeInfo[];

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.channels)
  @JoinColumn({ name: 'main_creator_id' })
  main_creator: UserInfo;

  @Column({ name: 'main_creator_id', nullable: true })
  main_creator_id: string;

  @Column('simple-json')
  creators: Creators[];

  @ManyToMany(() => UserInfo)
  @JoinTable()
  likers: UserInfo[];

  @ManyToMany(() => UserInfo)
  @JoinTable()
  subscribers: UserInfo[];

  @Column({
    type: 'bigint',
    default: 0,
  })
  play_count: number;
}
