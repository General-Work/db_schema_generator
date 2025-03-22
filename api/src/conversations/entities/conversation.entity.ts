import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { IMessageRole } from 'src/lib/utils';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb')
  messages: Array<{ role: IMessageRole; content: string }>;

  @ManyToOne(() => Project, (project) => project.conversations)
  project: Project;
}
