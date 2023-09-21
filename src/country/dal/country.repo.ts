import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import SequelizeDbClient from 'src/infra/Persistance/SequelizeDbClient';
import { Country } from './country.model';

@Injectable()
export class CountryRepository extends SequelizeDbClient {
  constructor(@InjectModel(Country) country: typeof Country) {
    super(country);
  }
}
