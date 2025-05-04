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
import { CreatorInfo } from './creator.entity';
import { EpisodeInfo } from './episode.entity';
import { AudenceInfo } from './audience.entity';

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
  create_at: number;

  @Column()
  num_of_audios: number;

  @Column()
  is_enabled: boolean;

  @Column()
  type_of_cost: TypeOfCost;

  @Column()
  nft_mint_amount: number;

  @OneToMany(() => EpisodeInfo, (episodeInfo) => episodeInfo.channel)
  episodes: EpisodeInfo[];

  @ManyToOne(() => CreatorInfo, (creatorInfo) => creatorInfo.channels)
  main_creator: CreatorInfo;

  @Column('simple-json')
  creators: Creators[];

  @ManyToMany(() => AudenceInfo)
  @JoinTable()
  likers: AudenceInfo[];

  @ManyToMany(() => AudenceInfo)
  @JoinTable()
  subscribers: AudenceInfo[];
}
