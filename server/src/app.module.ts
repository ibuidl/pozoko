import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChannelListenerModule } from './channel-listener/channel.module';
import { ChannelModule } from './channel/channel.module';
import { EpisodeListenerModule } from './episode-listener/episode.module';
import { EpisodeModule } from './episode/episode.module';
import { ExceptionFilter } from './exception/exception.filter';
import { ProgramModule } from './program/program.module';
import { RankModule } from './rank/rank.module';
import { RssModule } from './rss/rss.module';
import { SearchModule } from './search/search.module';
import { TasksModule } from './tasks/tasks.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: ['.env.pro', '.env.local', '.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT
        ? parseInt(process.env.DATABASE_PORT, 10)
        : 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [],
      autoLoadEntities: true,
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
      logging: false,
      ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true,
      },
    }),
    TasksModule,
    ProgramModule,
    ApiModule,
    UserModule,
    ChannelModule,
    ChannelListenerModule,
    RssModule,
    EpisodeModule,
    EpisodeListenerModule,
    RankModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_FILTER, useClass: ExceptionFilter }],
})
export class AppModule {}
