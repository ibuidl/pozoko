import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 允许所有来源跨域
  app.enableCors();
  // app.enableCors({
  //   origin: ['http://localhost:3000', 'http://localhost:5173'],
  //   credentials: true,
  // });
  const config = new DocumentBuilder()
    .setTitle('pozoko server')
    .setDescription('The pozoko API description')
    .setVersion('1.0')
    .addTag('pozoko')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
