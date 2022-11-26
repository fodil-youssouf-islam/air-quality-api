import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix("api");
    await app.init();
  });

  it(`Returns Hello World Message`, () => {
    return request(app.getHttpServer())
      .get("/api/")
      .expect(200)
      .expect("Hello World!");
  });

  it(`Returns an air quality json object`, () => {
    return request(app.getHttpServer())
      .get("/api/air-quality")
      .expect(200);
  });

  it(`Returns an air quality json object`, () => {
    return request(app.getHttpServer())
      .get("/api/air-quality?longitude=0.744414&latitude=7.44415852")
      .expect(200);
  });

  it(`Returns the most polluted air quality json object stored locally`, () => {
    return request(app.getHttpServer())
      .get("/api/most-polluted")
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});

