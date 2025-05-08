import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RssService } from './rss.service';

@Module({
  controllers: [rssController],
  providers: [RssService],
})
export class RssModule {}
