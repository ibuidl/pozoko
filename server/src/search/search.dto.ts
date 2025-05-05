import { IsString, IsOptional, IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchDto {
  @ApiProperty({
    description:
      'Keyword for fuzzy search across name, symbol, and publicKey fields',
  })
  @IsString()
  keyword: string;

  @ApiProperty({
    description: 'Page number for pagination',
    required: false,
    default: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiProperty({
    description: 'Number of items per page',
    required: false,
    default: 10,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;
}
