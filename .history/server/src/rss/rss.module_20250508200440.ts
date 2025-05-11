import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RssService } from './rss.service';

@Module({})
export class RssModule {
    imports: [HttpModule],
    providers: [RssService],
}
