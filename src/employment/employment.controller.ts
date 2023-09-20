import { Controller, Logger } from '@nestjs/common';

@Controller('employment')
export class EmploymentController {
  logger: Logger;
  constructor() {
    this.logger = new Logger('EmploymentController');
  }
}
