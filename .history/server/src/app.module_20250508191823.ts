import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProgramModule } from './program/program.module';
import { TasksModule } from './tasks/tasks.module';
import { RankModule } from './rank/rank.module';
import { SearchModule } from './search/search.module';
import { ApiModule } from './api/api.module';
import { UserModule } from './user/user.module';
import { ChannelModule } from './channel/channel.module';
import { RssModule } from './rss/rss.module';
import { EpisodeModule } from './episode/episode.module';

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
    RssModule,
    EpisodeModule,
    RankModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
