import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AirQuality } from "../entities/air-quality.entity";
import { Repository } from "typeorm";
import { AirQualityDto } from "../dtos/air-quality.dto";
import { map, Observable } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { Interval } from "@nestjs/schedule";

//TODO add Error Handling
@Injectable()
export class AirQualityService {
  constructor(@InjectRepository(AirQuality) private airQualityRepository: Repository<AirQuality>,
              private httpService: HttpService
  ) {
  }

  mostPollutedTime(): Promise<AirQuality> {
    //TODO use better performant alternative like using 'MAX' query
    return this.airQualityRepository.createQueryBuilder().orderBy("aqius", "DESC").getOne();
  }

  airQuality(airQualityDto: AirQualityDto): Observable<any> {
    return this.httpService.get(
      "https://api.airvisual.com/v2/nearest_city?lat=" + airQualityDto.latitude +
      "&lon=" + airQualityDto.longitude +
      "&key=d5852077-3af3-48e8-bcf8-7ba69b780117"
    ).pipe(map((response) => {
      return { Pollution: response.data["data"]["current"]["pollution"] };
    }));
  }

  @Interval(1200000)
  airQualityCron() {
    console.log("Called every 2 minutes on second 0");
    this.airQuality({ latitude: 48.856613, longitude: 2.352222 }).subscribe((result) => {
      console.log("airQualityCron result: ", result);
      this.airQualityRepository.insert(result["Pollution"]);
    });
  }
}
