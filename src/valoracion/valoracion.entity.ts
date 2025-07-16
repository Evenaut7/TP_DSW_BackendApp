import { Entity, PrimaryKey, Property, Cascade, ManyToMany, Collection, ManyToOne } from "@mikro-orm/core"
import { BaseEntity } from "../shared/db/baseEntity.entity.js"
import { Evento } from "../evento/evento.entity.js"
import { PuntoDeInteres } from "../puntoDeInteres/puntoDeInteres.entity.js"

@Entity()
export class Valoracion extends BaseEntity {

  @Property({nullable: false, unique: false})
  comentario!: string 

  private _estrellas!: number;
  @Property()
  get estrellas(): number {
    return this._estrellas;
  }

  set estrellas(value: number) {
    if (value < 0 || value > 5) {
      throw new Error('Las estrellas van del 0 al 5');
    }
    this._estrellas= value;
  }

  @Property({nullable: false, unique: false})
  fechaHora!: Date

  @ManyToOne( () => PuntoDeInteres, {nullable: false, unique: false})
  puntoDeInteres!: String

  //Agregar Usuario
}