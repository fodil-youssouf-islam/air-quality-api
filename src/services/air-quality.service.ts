import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AirQuality } from "../entities/air-quality.entity";
import { Repository } from "typeorm";
import { AirQualityDto } from "../dtos/air-quality.dto";
import { catchError, map, Observable, of } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { Interval } from "@nestjs/schedule";

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
    }), catchError((err) => {
      return of(new HttpException(err.response.data["data"]["message"], err.response.status));
    }));
  }

  @Interval(120000)
  airQualityCron(): void {
    console.log("Called every 2 minutes on second 0");
    this.airQuality({ latitude: "48.856613", longitude: "2.352222" }).subscribe((result) => {
      console.log("airQualityCron result: ", result);
      this.airQualityRepository.insert(result["Pollution"]);
    });
  }
}
