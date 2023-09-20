import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { GetEmpByCountryDTO } from './Dto/GetEmpByCountryDto';
import { GetEmpQueryDTO } from './Dto/GetEmpQueryDto';
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
        { selections: ['country', ['obs_value', 'value']] },
      );
      return employments;
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
      return employments;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @Get('/:country')
  async getEmploymentsOfCountry(@Param() params: GetEmpByCountryDTO) {
    try {
      this.logger.log('getEmploymentsOfCountry');
      const country = params.country;
      const employments = await this.employmentService.getEmployments({
        country,
      });
      return employments;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
