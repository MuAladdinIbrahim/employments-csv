import { Module } from '@nestjs/common';
import { AssetManagerController } from './asset-manager.controller';
import { AssetManagerService } from './asset-manager.service';

@Module({
  controllers: [AssetManagerController],
  providers: [AssetManagerService],
})
export class AssetManagerModule {}
