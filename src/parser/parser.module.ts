import { Module } from '@nestjs/common';
import { CsvModule } from 'nest-csv-parser';
import { ParserService } from './parser.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employment } from '../employment/dal/employment.model';
import { EmploymentRepository } from '../employment/dal/employment.repo';
import { Country } from '../country/dal/country.model';
import { CountryRepository } from '../country/dal/country.repo';
import { Utils } from '../utils/utils';

@Module({
  imports: [CsvModule, SequelizeModule.forFeature([Employment, Country])],
  providers: [
    ParserService,
    EmploymentRepository,
    CountryRepository,
    Utils.getInjections().EMP_REPO,
    Utils.getInjections().COUNTRY_REPO,
  ],
})
export class ParserModule {}
