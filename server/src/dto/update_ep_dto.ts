import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { AudioMimeType } from '../episode/episode.entity';

export class UpdateEpisodeDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  is_published?: boolean;

  @IsOptional()
  @IsNumber()
  pubDate?: number;

  @IsOptional()
  @IsNumber()
  fileSize?: number;

  @IsOptional()
  mimeType?: AudioMimeType;

  @IsOptional()
  @IsNumber()
  duration?: number;
}
