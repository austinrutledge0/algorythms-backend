import { Column, Entity } from "typeorm";

@Entity("products", { schema: "algorhythms" })
export class Products {
  @Column("char", { primary: true, name: "productnumber", length: 32 })
  productnumber!: string;

  @Column("varchar", { name: "productname", nullable: true, length: 25 })
  productname!: string | null;

  @Column("float", { name: "price", nullable: true, precision: 12 })
  price!: number | null;

  @Column("int", { name: "numberinstock", nullable: true })
  numberinstock!: number | null;
}
