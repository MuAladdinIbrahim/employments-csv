import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class GetEmpQueryDTO {
  @IsString()
  @IsOptional()
  @MaxLength(3)
  @MinLength(1)
  country: string;

  @IsString()
  @IsOptional()
  @MaxLength(4)
  @MinLength(4)
  year: string;

  @IsString()
  @IsOptional()
  sex: string;

  @IsString()
  @IsOptional()
  indicator: string;

  @IsString()
  @IsOptional()
  age_group: string;
}
//TODO add page, skip, limit, sort, order for pagination
