import { IsString } from 'class-validator';
import { PaginationDto } from 'src/common/common.dto';

export class findByIdDto {
  @IsString()
  channelId: string;
}

export class findByUserIdDto extends PaginationDto {
  @IsString()
  userId: string;
}

export class userActionDto {
  @IsString()
  channelId: string;

  @IsString()
  userId: string;
}
