import { IsString } from 'class-validator';
import { PaginationDto } from 'src/common/common.dto';

export class findByIdDto {
  @IsString()
  episodeId: string;
}

export class findByChannelIdDto extends PaginationDto {
  @IsString()
  channelId: string;
}

export class userActionDto {
  @IsString()
  episodeId: string;

  @IsString()
  userId: string;
}
