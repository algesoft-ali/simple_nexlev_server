import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import "dotenv/config";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ----- Middlewares
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  // ----- Error handlers

  // ----- Start server
  await app.listen(process.env.PORT);
}
bootstrap();
