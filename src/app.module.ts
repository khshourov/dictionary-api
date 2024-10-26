import { Module } from '@nestjs/common';
import { DictionaryRecordsModule } from './dictionary-records/dictionary-records.module';

@Module({
  imports: [DictionaryRecordsModule],
})
export class AppModule {}
