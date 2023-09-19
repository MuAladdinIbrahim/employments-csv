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
import { diskStorage } from 'multer';

@Controller('asset')
export class AssetManagerController {
  logger = new Logger('AssetManagerController');
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/files',
        filename: (req, file, cb) => {
          const fileName = file.originalname.split('.')[0];
          const fileExtName = file.originalname.split('.')[1];
          cb(null, `${fileName}-${new Date().getTime()}.${fileExtName}`);
        },
      }),
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
      this.logger.debug(
        `Uploading file..., ${file.originalname} as ${file.filename}`,
      );
      return {
        message: 'File uploaded successfully 🎉',
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
