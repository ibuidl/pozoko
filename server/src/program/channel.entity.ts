import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserInfo } from './user.entity';
import { EpisodeInfo } from './episode.entity';

enum TypeOfCost {
  Free = 0,
  Paid = 1,
}

interface Creators {
  address: string;
  share: number;
  verified: boolean;
}

@Entity()
@Unique(['public_key'])
@Index('idx_channel_name', ['name'])
@Index('idx_channel_symbol', ['symbol'])
export class ChannelInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 20 })
  name: string;

  @Column('varchar', { length: 10 })
  symbol: string;

  @Column('varchar', { length: 100 })
  description: string;

  @Column('varchar', { length: 200 })
  avatar: string;

  @Column('varchar', { length: 44 })
  public_key: string;

  @Column('varchar', { length: 44 })
  nft_mint_account: string;

  @Column()
  created_at: number;

  @Column({ default: 0 })
  num_of_audios: number;

  @Column({ default: false })
  is_enabled: boolean;

  @Column({
    type: 'enum',
    enum: TypeOfCost,
  })
  type_of_cost: TypeOfCost;

  @Column({ default: 0 })
  nft_mint_amount: number;

  @OneToMany(() => EpisodeInfo, (episodeInfo) => episodeInfo.channel)
  episodes: EpisodeInfo[];

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.channels)
  main_creator: UserInfo;

  @Column({ nullable: true })
  main_creator_id: number;

  @Column('simple-json')
  creators: Creators[];

  @ManyToMany(() => UserInfo)
  @JoinTable()
  likers: UserInfo[];

  @ManyToMany(() => UserInfo)
  @JoinTable()
  subscribers: UserInfo[];
}
