import { Entity, PrimaryKey, Property, Cascade, ManyToMany, Collection } from "@mikro-orm/core"
import { BaseEntity } from "../shared/db/baseEntity.entity.js"
import { Evento } from "../evento/evento.entity.js"
import { PuntoDeInteres } from "../puntoDeInteres/puntoDeInteres.entity.js"

@Entity()
export class Tag extends BaseEntity {
  
  @Property({nullable: false, unique: true, type: 'string'})
  nombre!: string

  @Property({nullable: false, unique: false, type: 'string'})
  descripcion!: string

  @Property({nullable: false, unique: false, type: 'string'})
  tipo!: string
  
  @ManyToMany( () => Evento, (evento) => evento.tags )
  eventos = new Collection<Tag>(this)

  @ManyToMany( () => PuntoDeInteres, (puntoDeInteres) => puntoDeInteres.tags)
  puntosDeInteres = new Collection<PuntoDeInteres>(this)
}