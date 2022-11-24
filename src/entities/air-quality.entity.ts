import { Column, Entity } from "typeorm";
import { Base } from "./base.entity";

@Entity()
export class AirQuality extends Base {
  @Column({ type: "varchar", length: 255 })
  ts: string;

  @Column({ type: "float" })
  aqius: number;

  @Column({ type: "varchar", length: 255 })
  mainus: string;

  @Column({ type: "float" })
  aqicn: number;

  @Column({ type: "varchar", length: 255 })
  maincn: string;

  constructor(ts?: string, aqius?: number, mainus?: string, aqicn?: number,
              maincn?: string) {
    super();
    this.ts = ts || "";
    this.aqius = aqius || 0;
    this.mainus = mainus || "";
    this.aqicn = aqicn || 0;
    this.maincn = maincn || "";
  }
}
