import { Column, Entity, OneToMany } from "typeorm";
import { Customers } from "./Customers";

@Entity("states", { schema: "algorhythms" })
export class States {
  @Column("varchar", { name: "name", length: 50 })
  name!: string;

  @Column("char", { primary: true, name: "abv", length: 2 })
  abv!: string;

  @Column("char", { primary: true, name: "country", length: 2 })
  country!: string;

  @Column("char", { name: "is_state", nullable: true, length: 1 })
  isState!: string | null;

  @Column("char", { name: "is_lower48", nullable: true, length: 1 })
  isLower48!: string | null;

  @Column("varchar", { name: "slug", length: 50 })
  slug!: string;

  @Column("float", { name: "latitude", nullable: true, precision: 9, scale: 6 })
  latitude!: number | null;

  @Column("float", {
    name: "longitude",
    nullable: true,
    precision: 9,
    scale: 6,
  })
  longitude!: number | null;

  @Column("bigint", { name: "population", nullable: true, unsigned: true })
  population!: string | null;

  @Column("float", {
    name: "area",
    nullable: true,
    unsigned: true,
    precision: 8,
    scale: 2,
  })
  area!: number | null;

  @OneToMany(() => Customers, (customers) => customers.customershippingstate2)
  customers!: Customers[];
}
