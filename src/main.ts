import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./all-exceptions-filter";
import { createDatabase } from "pg-god";
import { config } from "dotenv";

//d5852077-3af3-48e8-bcf8-7ba69b780117 iqair api key
config();

//TODO add versioning
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = +process.env.APP_PORT || 3000;

  app.setGlobalPrefix("api");
  // app.enableVersioning('v1');
  // no need for validation for now
  // app.useGlobalPipes(new ValidationPipe());
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const config = new DocumentBuilder()
    .setTitle("Air Quality")
    .setDescription("Air Quality API description")
    .setVersion("1.0")
    .addTag("air-quality")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("doc", app, document);

  await createDatabase({ databaseName: process.env["DB_NAME"], errorIfExist: false },
    {
      host: process.env["DB_HOST"],
      port: Number(process.env["DB_PORT"]),
      user: process.env["DB_USERNAME"],
      password: process.env["DB_PASSWORD"]
    });
  await app.listen(port);
}

bootstrap();
