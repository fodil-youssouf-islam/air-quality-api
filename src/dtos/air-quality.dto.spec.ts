import { AirQualityDto } from "./air-quality.dto";

describe("AirQualityDto class", () => {
  it("should make a airQualityDto with field value", () => {
    const airQualityDto = { longitude: 0, latitude: 0 } as AirQualityDto;
    expect(airQualityDto).toBeTruthy();
    expect(airQualityDto.longitude).toBe(0);
    expect(airQualityDto.latitude).toBe(0);
  });
});
