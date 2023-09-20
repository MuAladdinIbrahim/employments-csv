import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AssetManagerService {
  logger: Logger;
  constructor(private eventEmitter: EventEmitter2) {
    this.logger = new Logger('AssetManagerService');
  }

  store(file: Express.Multer.File) {
    const fileName = `${new Date().getTime()}-${file.originalname.replace(
      /\ /g,
      '-',
    )}`;
    fs.mkdirSync('./uploads/files', { recursive: true });
    fs.appendFile(
      `./uploads/files/${fileName}`,
      file.buffer,
      { encoding: 'utf-8' },
      (err) => {
        if (err) {
          this.logger.error(err);
          throw err;
        }
        this.logger.debug(
          `File ${file.originalname} saved as ${fileName} successfully`,
        );
      },
    );
    this.eventEmitter.emit('file.uploaded', {
      fileName,
      originalName: file.originalname,
    });
  }
}
