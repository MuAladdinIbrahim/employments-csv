import { Inject, Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import * as fs from 'fs';
import { CsvParser } from 'nest-csv-parser';
import { IRepository } from 'src/DAL/Abstracts/IRepository';

@Injectable()
export class ParserService<T> {
  logger: Logger;
  constructor(
    @Inject('EMPLOYMENT_REPOSITORY') private repo: IRepository,
    private readonly csvParser: CsvParser,
  ) {
    this.logger = new Logger('ParserService');
  }

  @OnEvent('file.uploaded')
  handleFileUploadedEvent(payload: {
    fileName: string;
    originalName: string;
  }): void {
    const stream = fs.createReadStream(`./uploads/files/${payload.fileName}`);
    this.parse({ stream, fileName: payload.fileName });
  }

  async parse(file: { stream: fs.ReadStream; fileName: string }) {
    // handle parsing logic and save to db
    this.logger.debug('Parsing file...');
    const entities = await this.csvParser.parse(
      file.stream,
      Entity,
      null,
      null,
      {
        separator: ',',
      },
    );
    // chunk entittes to be added to db
    const chunkSize = 500;
    const addChunkPromises = [];
    for (let i = 0; i < entities.list?.length; i = i + chunkSize) {
      const list = entities.list.slice(i, i + chunkSize);
      addChunkPromises.push(this.repo.bulkAdd(list));
    }
    await Promise.all(addChunkPromises);
  }
}
class Entity {}
