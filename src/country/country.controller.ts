import { Controller, Get, Logger, Param } from '@nestjs/common';
import { CountryService } from './country.service';
import { GetCountryEmpsDTO } from './Dto/GetCountryEmpsDto';

@Controller('countries')
export class CountryController {
  logger: Logger;
  constructor(private countryService: CountryService) {
    this.logger = new Logger('CountryController');
  }
  @Get('/:country/employments')
  async getEmployments(@Param() params: GetCountryEmpsDTO) {
    try {
      this.logger.log('/:country/employments');
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
