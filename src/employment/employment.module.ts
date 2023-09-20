import { Module } from '@nestjs/common';
import { EmploymentService } from './employment.service';
import { EmploymentController } from './employment.controller';
import { injections } from 'src/injections';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employment } from 'src/DAL/employment/employment.model';
import { EmploymentRepository } from 'src/DAL/employment/employment.repo';

@Module({
  imports: [SequelizeModule.forFeature([Employment])],
  providers: [EmploymentService, EmploymentRepository, injections.EMP_REPO],
  controllers: [EmploymentController],
})
export class EmploymentModule {}
