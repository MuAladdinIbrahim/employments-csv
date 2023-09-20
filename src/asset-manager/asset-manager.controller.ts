import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Logger,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';
import { AssetManagerService } from './asset-manager.service';

@Controller('asset')
export class AssetManagerController {
  logger: Logger;
  constructor(private assetManagerService: AssetManagerService) {
    this.logger = new Logger('AssetManagerController');
  }
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      // storage: diskStorage({
      //   destination: './uploads/files',
      //   filename: (req, file, cb) => {
      //     const fileName = file.originalname.split('.')[0];
      //     const fileExtName = file.originalname.split('.')[1];
      //     cb(null, `${fileName}-${new Date().getTime()}.${fileExtName}`);
      //   },
      // }),
    }),
  )
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'csv' }),
          new MaxFileSizeValidator({ maxSize: 30 * 1000 * 1000 }), // 30 MB
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      this.logger.debug(`Uploading file..., ${file.originalname}`);
      this.assetManagerService.store(file);
      return {
        message: 'File uploaded successfully 🎉',
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

/* TODO tradeoffs of using memory storage vs disk storage
  when using disk storage in inceptor, incetor will save the file to disk before checking the validators as
  inceptor is executed before the pipe
  when using memory storage, inceptor will save the file to memory and we can use the buffer later and fs
  to write the file to disk

  you can use disk memory and in catch clause of the controller, you can delete the file from disk, but
  you risk of using fs in catch clause!
*/
