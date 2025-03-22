import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', "PATCH"],
    allowedHeaders: ['Content-Type'],
  });
  const config = new DocumentBuilder()
    .setTitle('Schema Generator')
    .setDescription('')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('docs', app, document, {
  //   swaggerOptions: { tagsSorter: 'alpha' },
  // });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
