import { Module } from '@nestjs/common';
import { CsvModule } from 'nest-csv-parser';
import { ParserService } from './parser.service';
import { injections } from 'src/injections';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmploymentRepository } from 'src/DAL/employment/employment.repo';
import { Employment } from 'src/DAL/employment/employment.model';

@Module({
  imports: [CsvModule, SequelizeModule.forFeature([Employment])],
  providers: [ParserService, EmploymentRepository, injections.EMP_REPO],
})
export class ParserModule {}
