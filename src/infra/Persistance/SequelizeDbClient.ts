import { Injectable } from '@nestjs/common';
import { IRepository } from 'src/DAL/Abstracts/IRepository';

@Injectable()
export default class SequelizeDbClient implements IRepository {
  constructor(public model: any) {
    this.model = model;
  }

  async find(query: any): Promise<any> {
    return await this.model.findAll({
      where: query,
      raw: true,
    });
  }

  async findOne(query: any): Promise<any> {
    return await this.model.findOne(query);
  }

  async update(query: any, updates): Promise<any> {
    const result = await this.model.update(updates, {
      where: query,
      returning: true,
    });
    return result[1][0].dataValues;
  }

  delete(query: any): Promise<any> {
    return Promise.resolve([]);
  }

  async add(data: any): Promise<any> {
    await this.model.create(data);
  }

  async bulkAdd(data: any): Promise<any> {
    await this.model.create(data);
  }
}