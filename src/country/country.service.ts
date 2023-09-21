import { Inject, Injectable, Logger } from '@nestjs/common';
import { IRepository } from 'src/Abstracts/IRepository';
import { TYPES } from 'src/Abstracts/TYPES';

@Injectable()
export class CountryService {
  logger: Logger;
  constructor(
    @Inject(TYPES.COUNTRY_REPOSITORY) private countryRepo: IRepository,
  ) {
    this.logger = new Logger('CountryService');
  }

  async getEmployments(countryCode: string) {
    try {
      this.logger.log(`getEmployments for ${countryCode}`);
      const employments = await this.countryRepo.findOne({ code: countryCode }); // JOIN employment
      return employments;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
