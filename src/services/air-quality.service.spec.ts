import { Test, TestingModule } from "@nestjs/testing";
import { AirQualityService } from "./air-quality.service";
import { HttpModule } from "@nestjs/axios";
import { AirQuality } from "../entities/air-quality.entity";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AirQualityDto } from "../dtos/air-quality.dto";
import { tap } from "rxjs";

const airQuality = new AirQuality("ts", 0, "mainus", 0,
  "maincn");
const mostPollutedTime = new AirQuality("tsts", 10,
  "mainusmainus", 10, "maincnmaincn");

describe("AirQualityService", () => {
  let service: AirQualityService;
  let repo: Repository<AirQuality>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AirQualityService, {
        provide: getRepositoryToken(AirQuality),
        useValue: {
          createQueryBuilder: jest.fn(() => ({
            orderBy: jest.fn().mockReturnThis(),
            getOne: jest.fn().mockReturnValueOnce(mostPollutedTime)
          })),
          airQuality: jest.fn().mockResolvedValue(airQuality),
          mostPollutedTime: jest.fn().mockResolvedValue(mostPollutedTime)
        }
      }],
      imports: [HttpModule]
    }).compile();

    service = module.get<AirQualityService>(AirQualityService);
    repo = module.get<Repository<AirQuality>>(getRepositoryToken(AirQuality));
  });

  it("AirQualityService - should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("airQuality", () => {
    it("should return airQuality object", async () => {
      service.airQuality(new AirQualityDto()).pipe(tap((_airQuality) => {
        expect(_airQuality).toEqual(airQuality);
      })).subscribe();
    });
  });

  describe("mostPollutedTime", () => {
    it("should return airQuality object every 1 minute", async () => {
      const _mostPollutedTime = await service.mostPollutedTime();
      expect(_mostPollutedTime).toEqual(mostPollutedTime);
    });
  });

  describe("airQualityCron", () => {
    it("should insert new airQuality object", async () => {
      // const _mostPollutedTime = await service.mostPollutedTime();
      // expect(_mostPollutedTime).toEqual(mostPollutedTime);
    });
  });
});
