import { Module } from '@nestjs/common';
import { AssetManagerController } from './asset-manager.controller';

@Module({
  controllers: [AssetManagerController],
})
export class AssetManagerModule {}
