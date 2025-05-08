import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RssService } from './rss.service';

@Module({
  imports: [HttpModule],
  providers: [RssService],
})
export class RssModule {}
