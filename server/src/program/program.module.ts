import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProgramService } from './program.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [ProgramService],
  exports: [ProgramService],
})
export class ProgramModule {}
