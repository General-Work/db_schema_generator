import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @IsNotEmpty({ message: 'name is required' })
  @IsString()
  @ApiProperty({
    description: 'name',
    example: 'name',
    required: true,
    type: String,
  })
  prompt: string;
}
