export interface IRepository {
  add(payload: any): any;
  bulkAdd(payload: any): any;
  find(query: any, options?: any): any;
  findOne(query: any): any;
  delete(query: any): any;
  update(query: any, updates: any): any;
}
