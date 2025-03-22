import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { SchemaService } from 'src/schema/schema.service';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConversationsService } from 'src/conversations/conversations.service';
import { IMessageRole } from 'src/lib/utils';
import { Readable } from 'stream';
import { Observable } from 'rxjs';
// import { AiService } from 'src/ai/ai.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private conversationsService: ConversationsService,
    // private aiService: AiService,
    private schemaService: SchemaService,
  ) {}

  parseContent = (content: string) => {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    return {
      isJson: !!jsonMatch,
      jsonData: jsonMatch ? JSON.parse(jsonMatch[0]) : null,
    };
  };
  async create(createProjectDto: CreateProjectDto) {
    const schemaResult = await this.schemaService.generateSchema(
      createProjectDto.prompt,
      [],
    );
    const title = await this.schemaService.generateTitle(
      createProjectDto.prompt,
    );
    const project = this.projectRepository.create({
      name: title,
      schema: this.parseContent(schemaResult.content).jsonData,
    });
    const savedProject = await this.projectRepository.save(project);

    const messages: Array<{ role: IMessageRole; content: string }> = [
      { role: 'user', content: createProjectDto.prompt },
      {
        role: schemaResult.role as IMessageRole,
        content: schemaResult.content,
      },
    ];

    await this.conversationsService.create(savedProject, messages);
    return savedProject;
  }

  findAll() {
    return this.projectRepository.find();
  }

  async findOne(id: string, allowRelations = true) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: allowRelations ? ['conversations'] : [],
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (allowRelations) {
      return {
        ...project,
        conversations: project.conversations.map((conversation) => ({
          ...conversation,
          messages: conversation.messages.map((message) => ({
            ...message,
            ...this.parseContent(message.content),
          })),
        })),
      };
    }

    return project;
  }

  // async stream(id: string, allowRelations = true): Promise<Observable<any>> {
  //   const project = await this.projectRepository.findOne({
  //     where: { id },
  //     relations: allowRelations ? ['conversations'] : [],
  //   });

  //   if (!project) {
  //     throw new NotFoundException('Project not found');
  //   }

  //   const stream = new Readable({
  //     objectMode: true,
  //     read() {},
  //   });

  //   stream.push({
  //     ...project,
  //     conversations: allowRelations
  //       ? project.conversations.map((conversation) => ({
  //           ...conversation,
  //           messages: conversation.messages.map((message) => ({
  //             ...message,
  //             ...this.parseContent(message.content),
  //           })),
  //         }))
  //       : undefined,
  //   });
  //   stream.push(null);

  //   return new Observable((subscriber) => {
  //     stream.on('data', (chunk) => subscriber.next(chunk));
  //     stream.on('end', () => subscriber.complete());
  //     stream.on('error', (err) => subscriber.error(err));
  //   });
  // }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    let project = await this.findOne(id, false);

    const conversationHistory =
      await this.conversationsService.findConversationsByProjectId(project.id);
    const oldMessages = conversationHistory.flatMap(
      (conversation) => conversation.messages,
    );

    const schemaResult = await this.schemaService.generateSchema(
      updateProjectDto.prompt,
      oldMessages,
    );
    const parseData = this.parseContent(schemaResult.content);

    if (parseData.isJson) {
      project.schema = parseData.jsonData;
      project = await this.projectRepository.save(project);
    }

    const messages: Array<{ role: IMessageRole; content: string }> = [
      { role: 'user', content: updateProjectDto.prompt },
      {
        role: schemaResult.role as IMessageRole,
        content: schemaResult.content,
      },
    ];

    await this.conversationsService.create(project, messages);

    return project;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
