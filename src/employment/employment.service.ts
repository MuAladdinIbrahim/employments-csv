import { Inject, Injectable, Logger } from '@nestjs/common';
import { IRepository } from 'src/Abstracts/IRepository';
import { TYPES } from 'src/Abstracts/TYPES';
import { Employment } from './dal/employment.model';

@Injectable()
export class EmploymentService {
  logger: Logger;
  constructor(
    @Inject(TYPES.EMPLOYMENT_REPOSITORY) private employmentRepo: IRepository,
  ) {
    this.logger = new Logger('EmploymentService');
  }

  async getEmployments(query: any, options?: any) {
    try {
      const employments: Employment[] = await this.employmentRepo.find(query, {
        selections: options?.selections,
      });
      return employments;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
