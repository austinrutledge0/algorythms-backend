import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Cards } from "./Cards";
import { States } from "./States";

@Index("customers_cards__fk", ["cardnumber"], {})
@Index("customershippingstate", ["customershippingstate"], {})
@Entity("customers", { schema: "algorhythms" })
export class Customers {
  @Column("char", { primary: true, name: "customernumber", length: 32 })
  customernumber!: string;

  @Column("char", { name: "cardnumber", nullable: true, length: 32 })
  cardnumber!: string | null;

  @Column("int", { name: "pointcost", nullable: true })
  pointcost!: number | null;

  @Column("varchar", { name: "customerfirstname", nullable: true, length: 50 })
  customerfirstname!: string | null;

  @Column("varchar", { name: "customerlastname", nullable: true, length: 50 })
  customerlastname!: string | null;

  @Column("varchar", {
    name: "customershippingstreetaddress",
    nullable: true,
    length: 100,
  })
  customershippingstreetaddress!: string | null;

  @Column("int", { name: "customershippingzipcode", nullable: true })
  customershippingzipcode!: number | null;

  @Column("char", { name: "customershippingstate", nullable: true, length: 2 })
  customershippingstate!: string | null;

  @ManyToOne(() => Cards, (cards) => cards.customers, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "cardnumber", referencedColumnName: "cardnumber" }])
  cardnumber2!: Cards;

  @ManyToOne(() => States, (states) => states.customers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "customershippingstate", referencedColumnName: "abv" }])
  customershippingstate2!: States;
}
