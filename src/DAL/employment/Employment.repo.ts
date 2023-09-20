import { IRepository } from '../Abstracts/IRepository';

export class EmploymentRepository implements IRepository {
  add(payload: any) {
    console.log({ payload });
  }
  bulkAdd(payload: any) {
    console.log({ payload });
  }
}
