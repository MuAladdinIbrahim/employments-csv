import { CountryRepository } from '../country/dal/country.repo';
import { EmploymentRepository } from '../employment/dal/employment.repo';

export class Utils {
  static getConstants() {
    return {
      EMPLOYMENT_REPOSITORY: 'EMPLOYMENT_REPOSITORY',
      COUNTRY_REPOSITORY: 'COUNTRY_REPOSITORY',
    };
  }

  static getInjections() {
    return {
      EMP_REPO: {
        provide: Utils.getConstants().EMPLOYMENT_REPOSITORY,
        useExisting: EmploymentRepository,
      },
      COUNTRY_REPO: {
        provide: Utils.getConstants().COUNTRY_REPOSITORY,
        useExisting: CountryRepository,
      },
    };
  }
}
