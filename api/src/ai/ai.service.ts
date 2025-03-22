import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async generateConversation(
    prompt: string,
    conversationHistory: Array<{ role: string; content: string }>,
  ): Promise<{
    role: string;
    content: string;
  }> {
    const messages: any[] = [
      ...conversationHistory,
      { role: 'user', content: prompt },
    ];

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are a database schema generator. Ask relevant questions to understand the project requirements and generate a database schema in valid JSON format. Ensure the response is a properly formatted JSON object with tables and columns. Each column should have name, type, primary_key, and foreign_key properties.',
        },
        ...messages,
      ],
    });
    const { role, content } = response.choices[0].message;

    return {
      role,
      content,
    };

    // const jsonMatch = content.match(/\{[\s\S]*\}/);
    // const isJson = jsonMatch ? true : false;

    // return {
    //   role,
    //   content,
    //   isJson,
    //   jsonData: isJson ? JSON.parse(jsonMatch[0]) : null,
    // };
  }

  async generateTitleFromPrompt(prompt: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Generate a short, meaningful title for this prompt:',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 10,
    });

    return response.choices[0].message.content.trim();
  }
}
