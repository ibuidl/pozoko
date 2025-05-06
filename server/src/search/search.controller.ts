import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchDto } from './search.dto';

@Controller('api/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(@Query() dto: SearchDto) {
    return this.searchService.search(dto);
  }

  @Get('users')
  async searchUsers(@Query() dto: SearchDto) {
    return this.searchService.searchUsers(dto);
  }

  @Get('channels')
  async searchChannels(@Query() dto: SearchDto) {
    return this.searchService.searchChannels(dto);
  }

  @Get('episodes')
  async searchEpisodes(@Query() dto: SearchDto) {
    return this.searchService.searchEpisodes(dto);
  }
}
