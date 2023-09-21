import { Module } from '@nestjs/common';
import { Utils } from './utils';

@Module({
  providers: [Utils],
})
export class UtilsModule {}
