import { Conversation } from 'src/conversations/entities/conversation.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('jsonb', { nullable: true })
  schema: object;

  @OneToMany(() => Conversation, (conversation) => conversation.project)
  conversations: Conversation[];
}
