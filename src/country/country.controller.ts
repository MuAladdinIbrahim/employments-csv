import { Controller, Get, Logger, Param } from '@nestjs/common';
import { CountryService } from './country.service';
import { GetCountryEmpsDTO } from './Dto/get-country-emps.dto';

@Controller('countries')
export class CountryController {
  logger: Logger;
  constructor(private countryService: CountryService) {
    this.logger = new Logger('CountryController');
  }
  @Get('/:countryCode/employments')
  async getEmployments(@Param() params: GetCountryEmpsDTO) {
    try {
      this.logger.log('/:countryCode/employments');
      const employments = await this.countryService.getEmployments(
        params.countryCode,
      );
      return employments;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
