import { Module } from '@nestjs/common';
import { CsvModule, CsvParser } from 'nest-csv-parser';
import { ParserService } from './parser.service';
import { injections } from 'src/injections';
import { EmploymentRepository } from 'src/DAL/employment/employment.repo';
import { Employment } from 'src/DAL/employment/employment.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [CsvModule, CsvParser, SequelizeModule.forFeature([Employment])],
  providers: [ParserService, EmploymentRepository, injections.EMP_REPO],
})
export class ParserModule {}
