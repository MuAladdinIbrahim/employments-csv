import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './infra/config.schema';
import { AssetManagerModule } from './asset-manager/asset-manager.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    AssetManagerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
