import { Column, Entity } from "typeorm";

@Entity("rewards", { schema: "algorhythms" })
export class Rewards {
  @Column("char", { primary: true, name: "rewardnumber", length: 32 })
  rewardnumber!: string;

  @Column("varchar", { name: "rewardname", nullable: true, length: 25 })
  rewardname!: string | null;

  @Column("varchar", { name: "rewarddescription", nullable: true, length: 300 })
  rewarddescription!: string | null;

  @Column("int", { name: "pointcost", nullable: true })
  pointcost!: number | null;
}
