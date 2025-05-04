import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ChannelInfo } from './channel.entity';

@Entity()
@Unique(['public_key'])
@Index('idx_creator_name', ['nickname'])
export class AudenceInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  public_key: string;

  @Column()
  owner: string;

  @Column()
  create_at: number;

  @Column()
  is_frozen: boolean;

  @ManyToMany(() => ChannelInfo)
  @JoinTable()
  likers: ChannelInfo[];

  @ManyToMany(() => ChannelInfo)
  @JoinTable()
  subscribers: ChannelInfo[];

  @Column('varchar', { length: 200 })
  avatar: string;
}
