import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import SequelizeDbClient from 'src/infra/Persistance/SequelizeDbClient';
import { Employment } from './employment.model';

@Injectable()
export class EmploymentRepository extends SequelizeDbClient {
  constructor(@InjectModel(Employment) employment: typeof Employment) {
    super(employment);
  }
}
