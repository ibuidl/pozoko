import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserInfo } from './user.entity';
import { EpisodeInfo } from './episode.entity';

export abstract class BaseTransactionRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 36 })
  episode_id: string;

  @Column('varchar', { length: 36 })
  user_id: string;

  @Column('varchar', { length: 200 })
  tx_hash: string;

  @Column({
    type: 'bigint',
    comment: 'Amount in lamports',
  })
  amount: number;

  @Column({
    type: 'bigint',
    comment: 'Timestamp in seconds',
  })
  created_at: number;

  @ManyToOne(() => EpisodeInfo)
  @JoinColumn({ name: 'episode_id' })
  episode: EpisodeInfo;

  @ManyToOne(() => UserInfo)
  @JoinColumn({ name: 'user_id' })
  user: UserInfo;
}

@Entity('ep_purchase_record')
export class EpisodePurchaseRecord extends BaseTransactionRecord {}

@Entity('ep_tip_record')
export class EpisodeTipRecord extends BaseTransactionRecord {}
