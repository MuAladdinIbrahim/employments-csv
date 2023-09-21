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
      const country = await this.countryService.getCountryWithEmployments(
        params.countryCode,
      );
      return { data: country }; //TODO check what you need to return, maybe {data: country.employments count: country.employments.length}
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
