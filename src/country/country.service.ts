import { Inject, Injectable, Logger } from '@nestjs/common';
import { IRepository } from '../Abstracts/IRepository';
import { Utils } from '../utils/utils';

@Injectable()
export class CountryService {
  logger: Logger;
  constructor(
    @Inject(Utils.getConstants().COUNTRY_REPOSITORY)
    private countryRepo: IRepository,
  ) {
    this.logger = new Logger('CountryService');
  }

  async getCountryWithEmployments(countryCode: string) {
    try {
      this.logger.log(`getCountryWithEmployments for ${countryCode}`);
      const country = await this.countryRepo.findOne(
        { code: countryCode },
        { include: 'employments', raw: false },
      );
      return country;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
