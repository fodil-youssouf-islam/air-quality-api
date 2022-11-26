import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AirQualityService } from "./services/air-quality.service";
import { AirQuality } from "./entities/air-quality.entity";
import { ScheduleModule } from "@nestjs/schedule";
import { config } from "dotenv";

config();

@Module({
  imports: [HttpModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env["DB_HOST"],
      port: Number(process.env["DB_PORT"]),
      username: process.env["DB_USERNAME"],
      password: process.env["DB_PASSWORD"],
      database: process.env["DB_NAME"],
      entities: [AirQuality],
      synchronize: true
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([AirQuality])],
  controllers: [AppController],
  providers: [AppService, AirQualityService]
})
export class AppModule {
}
