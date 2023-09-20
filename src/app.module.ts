import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './infra/config.schema';
import { AssetManagerModule } from './asset-manager/asset-manager.module';
import { ParserModule } from './parser/parser.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    AssetManagerModule,
    ParserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
