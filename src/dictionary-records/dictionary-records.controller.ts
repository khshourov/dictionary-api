import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { DictionaryRecordService } from './dictionary-records.service';
import { User } from '../auth/interfaces/user.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('dictionary')
export class DictionRecordController {
  constructor(
    private readonly dictionaryRecordService: DictionaryRecordService,
  ) {}

  @Get(':word')
  @UseGuards(JwtAuthGuard)
  async getDictionaryWord(
    @Param('word') word: string,
    @Req() request: Request,
  ) {
    const dictionaryRecord = await this.dictionaryRecordService.findWord(
      word,
      request.user as User,
    );
    if (!dictionaryRecord) {
      throw new NotFoundException(`${word} not found`);
    }

    return dictionaryRecord;
  }
}
