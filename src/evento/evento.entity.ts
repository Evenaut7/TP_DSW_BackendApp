import { Entity, PrimaryKey, Property, Cascade, DecimalType, ManyToMany, ManyToOne } from "@mikro-orm/core"
import { BaseEntity } from "../shared/db/baseEntity.entity.js"
import { PuntoDeInteres } from "../puntoDeInteres/puntoDeInteres.entity.js"
import { Tag } from "../tag/tag.entity.js"

@Entity()
export class Evento extends BaseEntity {

  @Property({nullable: false, unique: false})
  titulo!: string

  @Property({nullable: false, unique: false})
  descripcion!: string

  @Property({nullable: false, unique: false})
  horaDesde!: Date

  @Property({nullable: false, unique: false})
  horaHasta!: Date

  @Property({nullable: false, unique: true})
  estado!: string

  @ManyToMany( () => Tag, (tag) => tag.eventos, { nullable: true, owner: true, cascade: [Cascade.ALL]})
  tags!: Tag[]

  @ManyToOne( () => PuntoDeInteres, {nullable: false, unique: false})
  puntoDeInteres!: String
}