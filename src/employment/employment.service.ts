import { Inject, Injectable, Logger } from '@nestjs/common';
import { IRepository } from 'src/DAL/Abstracts/IRepository';
import { TYPES } from 'src/DAL/Abstracts/TYPES';

@Injectable()
export class EmploymentService {
  logger: Logger;
  constructor(
    @Inject(TYPES.EMPLOYMENT_REPOSITORY) private employmentRepo: IRepository,
  ) {
    this.logger = new Logger('EmploymentService');
  }
}
