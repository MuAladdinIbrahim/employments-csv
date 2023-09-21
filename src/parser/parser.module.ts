import { Module } from '@nestjs/common';
import { CsvModule } from 'nest-csv-parser';
import { ParserService } from './parser.service';
import { injections } from 'src/injections';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employment } from 'src/employment/dal/employment.model';
import { EmploymentRepository } from 'src/employment/dal/employment.repo';

@Module({
  imports: [CsvModule, SequelizeModule.forFeature([Employment])],
  providers: [ParserService, EmploymentRepository, injections.EMP_REPO],
})
export class ParserModule {}
