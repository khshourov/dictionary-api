import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DictionaryRecordService } from './dictionary-records.service';
import { DictionRecordController } from './dictionary-records.controller';
import { DictionaryWord } from './entities/dictionary-record.entity';
import { AccessSummary } from './entities/access-summary.entity';
import { AccessLog } from './entities/access-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DictionaryWord, AccessSummary, AccessLog]),
  ],
  providers: [DictionaryRecordService],
  controllers: [DictionRecordController],
})
export class DictionaryRecordsModule {}
