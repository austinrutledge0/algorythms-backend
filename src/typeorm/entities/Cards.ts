import { Column, Entity, OneToMany } from "typeorm";
import { Customers } from "./Customers";

@Entity("cards", { schema: "algorhythms" })
export class Cards {
  @Column("char", { primary: true, name: "cardnumber", length: 32 })
  cardnumber!: string;

  @Column("int", { name: "cardtype", nullable: true })
  cardtype!: number | null;

  @Column("int", { name: "datecreated", nullable: true })
  datecreated!: number | null;

  @Column("int", { name: "value", nullable: true })
  value!: number | null;

  @OneToMany(() => Customers, (customers) => customers.cardnumber2)
  customers!: Customers[];
}
