import { Module } from '@nestjs/common';
import { EmploymentService } from './employment.service';
import { EmploymentController } from './employment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employment } from './dal/employment.model';
import { EmploymentRepository } from './dal/employment.repo';
import { Utils } from '../utils/utils';

@Module({
  imports: [SequelizeModule.forFeature([Employment])],
  providers: [
    EmploymentService,
    EmploymentRepository,
    Utils.getInjections().EMP_REPO,
  ],
  controllers: [EmploymentController],
})
export class EmploymentModule {}
