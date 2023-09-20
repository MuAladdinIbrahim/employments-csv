import { IsString, MaxLength, MinLength } from 'class-validator';

export class GetEmpByCountryDTO {
  @IsString()
  @MaxLength(3)
  @MinLength(2)
  country: string;
}
//TODO add page, skip, limit, sort, order for pagination
