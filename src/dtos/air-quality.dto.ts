import { ApiProperty } from "@nestjs/swagger";

//TODO add Validators
export class AirQualityDto {
  @ApiProperty({ example: 2.352222, description: "The location longitude" })
  longitude: number;

  @ApiProperty({ example: 48.856613, description: "The location latitude" })
  latitude: number;
}
