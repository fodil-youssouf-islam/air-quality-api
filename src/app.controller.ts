import { Body, Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { AirQualityDto } from "./dtos/air-quality.dto";
import { AirQualityService } from "./services/air-quality.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AirQuality } from "./entities/air-quality.entity";

@ApiTags("air-quality")
@Controller("Air Quality")
export class AppController {
  constructor(private readonly appService: AppService,
              private airQualityService: AirQualityService) {
  }

  @Get()
  @ApiOperation({ summary: "Welcome Message" })
  @ApiResponse({ status: 200, description: "The Hello World! Message", type: "Hello World!" })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/air-quality")
  @ApiOperation({ summary: "Collect Air Quality Data and present it" })
  @ApiResponse({
    status: 200, description: "The Air Quality JSON",
    type: AirQuality
  })
  airQuality(@Body() airQualityDto: AirQualityDto): any {
    return this.airQualityService.airQuality(airQualityDto);
  }

  @Get("/most-polluted")
  @ApiOperation({ summary: "Return the most polluted time of Paris" })
  @ApiResponse({
    status: 200,
    description: "Return most polluted air quality time of Paris",
    type: AirQuality
  })
  mostPollutedTime(): any {
    return this.airQualityService.mostPollutedTime();
  }
}
