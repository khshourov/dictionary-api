import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';

import { DictionaryWord } from './dictionary-record.entity';

@Entity('access_summaries')
@Index(['userId', 'word'], { unique: true })
export class AccessSummary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: string; // Google User-Id

  @OneToOne(() => DictionaryWord)
  @JoinColumn({ name: 'word_id' })
  word: DictionaryWord;

  @Column({ type: 'smallint', name: 'total_access' })
  totalAccess: number;

  @Column({
    type: 'timestamp',
    name: 'last_access_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastAccessAt: Date;
}
