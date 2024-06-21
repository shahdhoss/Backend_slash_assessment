import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule,DocumentBuilder } from '@nestjs/swagger';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  const options = new DocumentBuilder()
  .setTitle('Slash assessment')
  .setDescription('api-endpoints')
  .setVersion('1.0')
  .addServer('http://localhost:3000/','Local environment')
  .build()
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen( process.env.PORT ||3000);
}
bootstrap();
