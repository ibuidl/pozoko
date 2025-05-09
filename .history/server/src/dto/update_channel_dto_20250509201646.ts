import { IsOptional, IsString } from 'class-validator';
import { FeedItunesType } from 'podcast';

export class UpdateChannelDto {
  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  subcategory?: string;

  @IsOptional()
  itunesType?: FeedItunesType;
}
