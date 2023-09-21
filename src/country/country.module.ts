import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { injections } from 'src/injections';
import { CountryRepository } from './dal/country.repo';
import { Country } from './dal/country.model';

@Module({
  imports: [SequelizeModule.forFeature([Country])],
  controllers: [CountryController],
  providers: [CountryService, CountryRepository, injections.COUNTRY_REPO],
})
export class CountryModule {}
