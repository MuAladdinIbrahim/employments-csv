import { Employment } from '../../src/employment/dal/employment.model';
import { EmploymentRepository } from '../../src/employment/dal/employment.repo';
import { EmploymentService } from '../../src/employment/employment.service';

describe('EmploymentService', () => {
  let employmentService: EmploymentService;
  let employmentRepo: EmploymentRepository;

  beforeEach(async () => {
    employmentRepo = new EmploymentRepository(Employment);
    jest.spyOn(employmentRepo, 'find').mockResolvedValue([
      {
        id: 1,
        year: '2022',
        country: 'USA',
        indicator: 'indicator',
        source: '',
        sex: 'SEX_T',
        age_group: 'AGE_YTHADULT_YGE15',
        obs_value: '',
        obs_status: '',
        note_classif: '',
        note_indicator: '',
        note_source: '',
      },
    ]);
    employmentService = new EmploymentService(employmentRepo);
  });

  it('should return employments of last year', async () => {
    const employments = await employmentService.getEmployments({
      year: '2022',
    });
    expect(Object.keys(employments[0])).toHaveLength(12);
    expect(employments).toHaveLength(1);
    expect(employments[0]).toHaveProperty('year');
    expect(employments[0]).toHaveProperty('sex');
    expect(employments[0]).toHaveProperty('age_group');
    expect(employments[0]).toHaveProperty('country');
  });
});
