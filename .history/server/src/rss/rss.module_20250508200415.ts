import { Module } from '@nestjs/common';

@Module({})
export class RssModule {
    imports: [HttpModule],
      providers: [RssService],
}
