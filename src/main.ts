import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.SERVER_PORT || 3000;
  const config = new DocumentBuilder()
    .setTitle('Credit Union - Core Financial Solution')
    .setDescription('Description')
    .setVersion('1.0')
    .addTag('cu_cfs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
      disableErrorMessages: false,
      // exceptionFactory: (errors: ValidationError[]) => {
      //   try {
      //     const result = errors.map((error) => ({
      //       property: error.property,
      //       message: error.constraints[Object.keys(error.constraints)[0]],
      //     }));

      //     return new BadRequestException(result);
      //   } catch (error) {
      //     return new BadRequestException(errors);
      //   }
      // },

      // exceptionFactory: (errors: ValidationError[]) => {
      //   try {
      //     const result = errors.reduce((obj, error) => {
      //       Object.assign(obj, {
      //         [error.property]:
      //           error.constraints[Object.keys(error.constraints)[0]],
      //       });
      //       return obj;
      //     }, {});
      //     return new BadRequestException(result);
      //   } catch (error) {
      //     return new BadRequestException(errors);
      //   }
      // },
    }),
  );

  await app.listen(port);
}
bootstrap();
