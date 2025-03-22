import { Injectable } from '@nestjs/common';
import { AiService } from 'src/ai/ai.service';

@Injectable()
export class SchemaService {
  constructor(private readonly aiService: AiService) {}

  async generateSchema(
    prompt: string,
    conversationHistory: Array<{ role: string; content: string }>,
  ): Promise<{ role: string; content: string }> {
    return this.aiService.generateConversation(prompt, conversationHistory);
  }

  async generateTitle(prompt: string): Promise<string> {
    return this.aiService.generateTitleFromPrompt(prompt);
  }
}
