import { TYPES } from './Abstracts/TYPES';
import { CountryRepository } from './country/dal/country.repo';
import { EmploymentRepository } from './employment/dal/employment.repo';

export const injections = {
  EMP_REPO: {
    provide: TYPES.EMPLOYMENT_REPOSITORY,
    useExisting: EmploymentRepository,
  },
  COUNTRY_REPO: {
    provide: TYPES.COUNTRY_REPOSITORY,
    useExisting: CountryRepository,
  },
};
