import { Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entities/conversation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation])],
  controllers: [],
  providers: [ConversationsService],
  exports: [ConversationsService],
})
export class ConversationsModule {}
