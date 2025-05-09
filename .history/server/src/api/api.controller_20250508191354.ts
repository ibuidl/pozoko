import { Controller, Get, Header, Post, Query } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ChannelService } from 'src/channel/channel.service';
import { EpisodeService } from 'src/episode/episode.service';
import { AudioMimeType } from 'src/episode/episode.entity';
import { RssFeedService } from 'src/rss/rss.service';

@Controller('api')
export class ApiController {
  constructor(
    private userService: UserService,
    private ChannelService: ChannelService,
    private episodeService: EpisodeService,
    private rssFeedService: RssFeedService,
  ) {}
}
