import { Module } from '@nestjs/common';
import { CsvModule } from 'nest-csv-parser';
import { ParserService } from './parser.service';
import { injections } from 'src/injections';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employment } from 'src/employment/dal/employment.model';
import { EmploymentRepository } from 'src/employment/dal/employment.repo';
import { Country } from 'src/country/dal/country.model';
import { CountryRepository } from 'src/country/dal/country.repo';

@Module({
  imports: [CsvModule, SequelizeModule.forFeature([Employment, Country])],
  providers: [
    ParserService,
    EmploymentRepository,
    CountryRepository,
    injections.EMP_REPO,
    injections.COUNTRY_REPO,
  ],
})
export class ParserModule {}
