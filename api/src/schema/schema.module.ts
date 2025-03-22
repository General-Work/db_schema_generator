import { Module } from '@nestjs/common';
import { SchemaService } from './schema.service';
import { AiModule } from 'src/ai/ai.module';

@Module({
  imports: [AiModule],
  providers: [SchemaService],
  exports: [SchemaService],
})
export class SchemaModule {}
