import { Controller, Get, Query } from "@nestjs/common";
import { AppService } from "./app.service";
import { AirQualityDto } from "./dtos/air-quality.dto";
import { AirQualityService } from "./services/air-quality.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("air-quality")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private airQualityService: AirQualityService) {
  }

  @Get()
  @ApiOperation({ summary: "Welcome Message" })
  @ApiResponse({ status: 200, description: "The Hello World! Message" })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/air-quality")
  @ApiOperation({ summary: "Collect Air Quality Data and present it" })
  @ApiResponse({
    status: 200, description: "The Air Quality JSON"
  })
  airQuality(@Query() airQualityDto: AirQualityDto): any {
    return this.airQualityService.airQuality(airQualityDto);
  }

  @Get("/most-polluted")
  @ApiOperation({ summary: "Return the most polluted time of Paris" })
  @ApiResponse({
    status: 200,
    description: "Return most polluted air quality time of Paris"
  })
  mostPollutedTime(): any {
    return this.airQualityService.mostPollutedTime();
  }
}
