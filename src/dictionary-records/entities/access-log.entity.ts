import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

import { DictionaryWord } from './dictionary-record.entity';

@Entity('access_logs')
export class AccessLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: string; // Google UserId

  @ManyToOne(() => DictionaryWord)
  @JoinColumn({ name: 'word_id' })
  word: DictionaryWord;

  @Column({
    type: 'timestamp',
    name: 'access_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  accessAt: Date;
}
