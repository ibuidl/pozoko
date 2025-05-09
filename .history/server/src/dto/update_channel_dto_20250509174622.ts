import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateChannelDto {
  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ description: '子分类' })
  @IsOptional()
  @IsString()
  subcategory?: string;

  @ApiProperty({ description: 'iTunes类型' })
  @IsOptional()
  @IsString()
  itunesType?: string;

  @ApiProperty({ description: '频道描述' })
  @IsOptional()
  @IsString()
  description?: string;
}
