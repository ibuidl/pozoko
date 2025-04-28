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
import { EpisodeInfo } from './episode.entity';
import { UserInfo } from './user.entity';

@Entity()
@Unique(['public_key'])
export class ChannelInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column('varchar', { length: 20 })
  name: string;

  @Column('varchar', { length: 100 })
  description: string;

  @Column('varchar', { length: 200 })
  avatar: string;

  @Column('varchar', { length: 44 })
  public_key: string;

  @Column()
  create_at: number;

  @Index()
  @Column('varchar', { length: 10 })
  nft_symbol: string;

  @Column('varchar', { length: 44 })
  nft_mint_account: string;

  @Column()
  nft_mint_price: number;

  @Column()
  nft_mint_amount: number;

  @OneToMany(() => EpisodeInfo, (episodeInfo) => episodeInfo.channel)
  episodes: EpisodeInfo[];

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
