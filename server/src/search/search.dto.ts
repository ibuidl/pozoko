import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/common.dto';

export class SearchDto extends PaginationDto {
  @ApiProperty({
    description:
      'Keyword for fuzzy search across name, symbol, and publicKey fields',
  })
  @IsString()
  keyword: string;
}
