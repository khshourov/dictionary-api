import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dictionary_words')
export class DictionaryWord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  word: string;

  @Column({ type: 'text' })
  lexicalEntry: string; // Storing as gzip'd json string
}
