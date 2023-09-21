import { Inject, Injectable, Logger } from '@nestjs/common';
import { IRepository } from '../Abstracts/IRepository';
import { Utils } from '../utils/utils';
import { Employment } from './dal/employment.model';

@Injectable()
export class EmploymentService {
  logger: Logger;
  constructor(
    @Inject(Utils.getConstants().EMPLOYMENT_REPOSITORY)
    private employmentRepo: IRepository,
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
