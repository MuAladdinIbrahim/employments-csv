import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { GetEmpByCountryDTO } from './Dto/get-emp-by-country.dto';
import { GetEmpQueryDTO } from './Dto/get-emp-query.dto';
import { EmploymentService } from './employment.service';

@Controller('employments')
export class EmploymentController {
  logger: Logger;
  constructor(private employmentService: EmploymentService) {
    this.logger = new Logger('EmploymentController');
  }

  @Get('/last-year')
  async getEmploymentsOfLastYear() {
    try {
      this.logger.log('getEmploymentsOfLastYear');
      // return country, value
      const lastYear = (new Date().getFullYear() - 1).toString();
      const employments = await this.employmentService.getEmployments(
        { year: lastYear },
        {
          selections: [
            ['countryCode', 'country'],
            ['obs_value', 'value'],
          ],
        },
      );
      return { data: employments, count: employments.length };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @Get('/')
  async getEmployments(@Query() query: GetEmpQueryDTO) {
    try {
      this.logger.log('getEmployments');
      const employments = await this.employmentService.getEmployments(query);
      return { data: employments, count: employments.length };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @Get('/:countryCode')
  async getEmploymentsOfCountry(@Param() params: GetEmpByCountryDTO) {
    try {
      this.logger.log('getEmploymentsOfCountry');
      const countryCode = params.countryCode;
      const employments = await this.employmentService.getEmployments({
        countryCode,
      });
      return { data: employments, count: employments.length };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
