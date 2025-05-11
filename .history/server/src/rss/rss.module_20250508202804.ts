import { Module } from '@nestjs/common';
import { RssService } from './rss.service';

@Module({
  controllers: [RssController],
  providers: [RssService],
})
export class RssModule {}
