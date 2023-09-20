import { Module } from '@nestjs/common';
import { CsvModule, CsvParser } from 'nest-csv-parser';
import { EmploymentRepository } from 'src/DAL/employment/Employment.repo';
import { ParserService } from './parser.service';

@Module({
  imports: [CsvModule, CsvParser],
  providers: [
    ParserService,
    EmploymentRepository,
    {
      provide: 'EMPLOYMENT_REPOSITORY',
      useExisting: EmploymentRepository,
    },
  ],
})
export class ParserModule {}
