import { Entity, PrimaryKey, Property, Cascade, DecimalType, ManyToMany, OneToMany, Collection } from "@mikro-orm/core"
import { BaseEntity } from "../shared/db/baseEntity.entity.js"
import { Evento } from "../evento/evento.entity.js"
import { Tag } from "../tag/tag.entity.js"

@Entity()
export class PuntoDeInteres extends BaseEntity {
  
  @Property({nullable: false, unique: true})
  nombre!: string

  @Property({nullable: false, unique: false})
  descripcion!: string

  @Property({nullable: false, unique: true})
  imagen!: string

  @Property({nullable: false, unique: true})
  calle!: string

  @Property({nullable: false, unique: true})
  altura!: Number

  @Property({nullable: false, unique: false})
  privado!: boolean

  @ManyToMany( () => Tag, (tag) => tag.puntosDeInteres, { nullable: true, owner: true, cascade: [Cascade.ALL]})
  tags = new Collection<Tag>(this)

  @OneToMany( () => Evento, (evento) => evento.puntoDeInteres, { nullable: true, cascade: [Cascade.REMOVE]})
  eventos = new Collection<Evento>(this)

}