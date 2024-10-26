import { Module } from '@nestjs/common';
import { DictionaryRecordsModule } from './dictionary-records/dictionary-records.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DictionaryRecordsModule,
    AuthModule,
  ],
})
export class AppModule {}
