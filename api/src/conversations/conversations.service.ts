import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from './entities/conversation.entity';
import { Repository } from 'typeorm';
import { Project } from 'src/projects/entities/project.entity';
import { IMessageRole } from 'src/lib/utils';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
  ) {}

  create(
    project: Project,
    messages: Array<{ role: IMessageRole; content: string }>,
  ): Promise<Conversation> {
    const conversation = this.conversationRepository.create({
      project,
      messages,
    });
    return this.conversationRepository.save(conversation);
  }

  findAll() {
    return `This action returns all conversations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conversation`;
  }

  async findConversationsByProjectId(id: string) {
    const ret = await this.conversationRepository.find({
      where: { project: { id } },
    });
    // if (!ret) return new NotFoundException();
    return ret;
  }

  update(conversation: Conversation): Promise<Conversation> {
    return this.conversationRepository.save(conversation);
  }

  // async updateAll(project: Project,messages: Array<{ role: IMessageRole; content: string }> ){
  //   const con
  //   const ret = await this.conversationRepository.save()
  // }

  remove(id: number) {
    return `This action removes a #${id} conversation`;
  }
}
