import { TYPES } from './DAL/Abstracts/TYPES';
import { EmploymentRepository } from './DAL/employment/employment.repo';

export const injections = {
  EMP_REPO: {
    provide: TYPES.EMPLOYMENT_REPOSITORY,
    useExisting: EmploymentRepository,
  },
};
