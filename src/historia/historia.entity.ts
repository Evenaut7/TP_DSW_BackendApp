import { Cascade, Entity, ManyToOne, Property, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { PuntoDeInteres } from "../puntoDeInteres/puntoDeInteres.entity.js";

@Entity()
export class Historia extends BaseEntity {

  @Property({ nullable: false, unique: false})
  fechaDesde!: Date;

  @Property({ nullable: false, unique: false})
  fechaHasta?: Date;

  @Property({ nullable: false, unique: false})
  descripcion!: string;

  @Property({ nullable: false, unique: false})
  imagen!: string;

  @ManyToOne(() => PuntoDeInteres, { nullable: false, cascade: [Cascade.ALL] })
  puntoDeInteres!: Rel<PuntoDeInteres>;
}