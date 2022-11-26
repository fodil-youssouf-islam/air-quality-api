import { ApiProperty } from "@nestjs/swagger";

export class AirQualityDto {
  @ApiProperty({ required: false, example: "2.352222", description: "The location longitude" })
    // @IsNumberString()
    // @IsOptional()
  longitude: string;

  @ApiProperty({ required: false, example: "48.856613", description: "The location latitude" })
    // @IsNumberString()
    // @IsOptional()
  latitude: string;
}
