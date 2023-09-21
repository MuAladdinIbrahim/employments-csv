import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { CountryRepository } from './dal/country.repo';
import { Country } from './dal/country.model';
import { Utils } from '../utils/utils';

@Module({
  imports: [SequelizeModule.forFeature([Country])],
  controllers: [CountryController],
  providers: [
    CountryService,
    CountryRepository,
    Utils.getInjections().COUNTRY_REPO,
  ],
})
export class CountryModule {}
