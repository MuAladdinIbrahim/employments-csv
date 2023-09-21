import { Inject, Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import * as fs from 'fs';
import { CsvParser } from 'nest-csv-parser';
import { IRepository } from 'src/Abstracts/IRepository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TYPES } from 'src/Abstracts/TYPES';

@Injectable()
export class ParserService {
  logger: Logger;
  constructor(
    @Inject(TYPES.EMPLOYMENT_REPOSITORY) private repo: IRepository,
    private readonly csvParser: CsvParser,
    private eventEmitter: EventEmitter2,
  ) {
    this.logger = new Logger('ParserService');
  }

  @OnEvent('file.uploaded')
  async handleFileUploadedEvent(payload: {
    fileName: string;
    originalName: string;
  }): Promise<void> {
    try {
      const stream = fs.createReadStream(`./uploads/files/${payload.fileName}`);
      await this.parse({ stream, fileName: payload.fileName });
    } catch (error) {
      this.logger.error(error);
      this.eventEmitter.emit('file.parsing.failed', { payload, error });
    }
  }

  async parse(file: { stream: fs.ReadStream; fileName: string }) {
    try {
      // handle parsing logic and save to db
      this.logger.debug('Parsing file...');
      const entities = await this.csvParser.parse(
        file.stream,
        Entity,
        null,
        null,
        {
          separator: ',',
          bom: true, //TODO not working in this package, check it again
          mapHeaders: ({ header, value }) => {
            if (header === 'ref_area') return 'country';
            if (header === 'time') return 'year';
            if (header === 'classif1') return 'age_group';
            else return header;
          },
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
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
class Entity {
  ref_area: string;
  indicator: string;
  source: string;
  sex: string;
  classif1: string;
  time: string;
  obs_value: string;
  obs_status: string;
  note_classif: string;
  note_indicator: string;
  note_source: string;
}
