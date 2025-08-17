import { Cascade, DateType, Entity, ManyToOne, Property, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { PuntoDeInteres } from "../puntoDeInteres/puntoDeInteres.entity.js";

@Entity()
export class Historia extends BaseEntity {
  @Property({ nullable: false, unique: false, type: 'string'})
  titulo!: string

  @Property({ nullable: false, unique: false, type: 'date'})
  fechaDesde!: Date;

  @Property({ nullable: false, unique: false, type: 'date'})
  fechaHasta?: Date;

  @Property({ nullable: false, unique: false, type: 'string'})
  descripcion!: string;

  @Property({ nullable: true, type: 'string'})
  imagen?: string;

  @ManyToOne(() => PuntoDeInteres, { nullable: false, cascade: [Cascade.ALL] })
  puntoDeInteres!: Rel<PuntoDeInteres>;
}