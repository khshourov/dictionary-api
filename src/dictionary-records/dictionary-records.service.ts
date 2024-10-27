import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import DictionaryScraper, { Word } from 'dictionary-scraper';
import { InjectRepository } from '@nestjs/typeorm';
import { gzip } from 'zlib';

import { DictionaryWord } from './entities/dictionary-record.entity';
import { AccessLog } from './entities/access-log.entity';
import { User } from '../auth/interfaces/user.interface';
import { AccessSummary } from './entities/access-summary.entity';

@Injectable()
export class DictionaryRecordService {
  constructor(
    @InjectRepository(DictionaryWord)
    private dictionaryWordRepository: Repository<DictionaryWord>,
    @InjectRepository(AccessSummary)
    private accessSummaryRepository: Repository<AccessSummary>,
    @InjectRepository(AccessLog)
    private accessLogRepository: Repository<AccessLog>,
  ) {}

  async findWord(word: string, user: User) {
    const dictionaryWord = await this.retrieveDictionaryWord(word);
    if (!dictionaryWord) return null;

    const accessSummary = await this.accessSummaryRepository.findOne({
      where: { word: dictionaryWord, userId: user.id },
    });
    await this.updateAccessLog(dictionaryWord, user);

    return { dictionaryWord, accessSummary };
  }

  private async retrieveDictionaryWord(
    word: string,
  ): Promise<DictionaryWord | null> {
    let dictionaryWord = await this.dictionaryWordRepository.findOne({
      where: { word },
    });

    if (!dictionaryWord) {
      const lexicalEntry = await new DictionaryScraper().search(word);
      if (!lexicalEntry) return null;

      const zipped = await this.compress(lexicalEntry);
      dictionaryWord = await this.dictionaryWordRepository.save({
        word,
        lexicalEntry: zipped,
      });
      console.log(dictionaryWord);
    }

    return dictionaryWord;
  }

  private async updateAccessLog(word: DictionaryWord, user: User) {
    const ret = await this.accessSummaryRepository
      .createQueryBuilder()
      .update(AccessSummary)
      .set({
        totalAccess: () => `"total_access" + 1`,
        lastAccessAt: () => `CURRENT_TIMESTAMP`,
      })
      .where('word_id = :wordId AND user_id = :userId', {
        wordId: word.id,
        userId: user.id,
      })
      .execute();
    if (ret.affected === 0) {
      await this.accessSummaryRepository.save({
        word: word,
        userId: user.id,
        totalAccess: 1,
        lastAccessAt: new Date(),
      });
    }

    await this.accessLogRepository.save({
      word: word,
      userId: user.id,
      accessAt: new Date(),
    });
  }

  private async compress(dictionaryWord: Word): Promise<string> {
    return new Promise((resolve, reject) => {
      gzip(
        JSON.stringify(dictionaryWord),
        {
          level: 1, // Fastest compression
        },
        (err, commpressedWord) => {
          if (err) {
            return reject(err);
          }

          return resolve(commpressedWord.toString('base64'));
        },
      );
    });
  }
}
