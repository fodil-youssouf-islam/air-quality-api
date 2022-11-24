import { AirQuality } from "./air-quality.entity";

describe("AirQuality class", () => {
  it("should make a airQuality with fields default values", () => {
    const airQuality = new AirQuality();
    expect(airQuality).toBeTruthy();
    expect(airQuality.ts).toBe("");
    expect(airQuality.aqius).toBe(0);
    expect(airQuality.mainus).toBe("");
    expect(airQuality.aqicn).toBe(0);
    expect(airQuality.maincn).toBe("");
  });
  it("should make a airQuality with fields constructor values", () => {
    const airQuality = new AirQuality("ts", 1, "mainus", 1, "maincn");
    expect(airQuality).toBeTruthy();
    expect(airQuality.ts).toBe("ts");
    expect(airQuality.aqius).toBe(1);
    expect(airQuality.mainus).toBe("mainus");
    expect(airQuality.aqicn).toBe(1);
    expect(airQuality.maincn).toBe("maincn");
  });
});
