import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AirQualityService } from "./services/air-quality.service";
import { AirQualityDto } from "./dtos/air-quality.dto";
import { AirQuality } from "./entities/air-quality.entity";

const airQuality = new AirQuality("ts", 0, "mainus", 0,
  "maincn");
const mostPollutedTime = new AirQuality("tsts", 10,
  "mainusmainus", 10, "maincnmaincn");

describe("AppController", () => {
  let appController: AppController;
  let appService: AppService;
  let airQualityService: AirQualityService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getHello: jest.fn().mockImplementation(() => "Hello World!")
          }
        },
        {
          provide: AirQualityService,
          useValue: {
            airQuality: jest.fn().mockImplementation(() => airQuality),
            mostPollutedTime: jest.fn().mockImplementation(() => mostPollutedTime)
          }
        }
      ]
    }).compile();

    airQualityService = moduleRef.get<AirQualityService>(AirQualityService);
    appService = moduleRef.get<AppService>(AppService);
    appController = moduleRef.get<AppController>(AppController);
  });

  describe("root", () => {
    it("should return \"Hello World!\"", () => {
      expect(appController.getHello()).toBe("Hello World!");
      expect(appService.getHello).toHaveBeenCalled();
    });
  });

  describe("GET air-quality", () => {
    it("should return air quality json", () => {
      expect(appController.airQuality(new AirQualityDto())).toBe(airQuality);
      expect(airQualityService.airQuality).toHaveBeenCalled();
    });
  });

  describe("GET most-polluted", () => {
    it("should return most polluted air quality json", () => {
      expect(appController.mostPollutedTime()).toBe(mostPollutedTime);
      expect(airQualityService.mostPollutedTime).toHaveBeenCalled();
    });
  });
});
