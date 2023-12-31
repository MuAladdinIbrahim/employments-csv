import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './infra/config.schema';
import { AssetManagerModule } from './asset-manager/asset-manager.module';
import { ParserModule } from './parser/parser.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DatabaseModule } from './infra/DB/DbModule';
import { EmploymentModule } from './employment/employment.module';
import { CountryModule } from './country/country.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    AssetManagerModule,
    ParserModule,
    DatabaseModule,
    EmploymentModule,
    CountryModule,
    UtilsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
