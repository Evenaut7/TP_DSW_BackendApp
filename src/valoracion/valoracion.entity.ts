import { Entity, PrimaryKey, Property, Cascade, ManyToMany, Collection, ManyToOne } from "@mikro-orm/core"
import { BaseEntity } from "../shared/db/baseEntity.entity.js"
import { Evento } from "../evento/evento.entity.js"
import { PuntoDeInteres } from "../puntoDeInteres/puntoDeInteres.entity.js"
import { Usuario } from "../usuario/usuario.entity.js"


@Entity()
export class Valoracion extends BaseEntity {

  @Property({nullable: false, unique: false})
  comentario!: string 

  @Property({nullable: false, unique: false})
  cantEstrellas!: number 
 
  @Property({nullable: false, unique: false})
  fechaHora!: Date

  @ManyToOne( () => PuntoDeInteres, {nullable: false, unique: false})
  puntoDeInteres!: String

  @ManyToOne(()=> Usuario, { nullable: false})
  usuario!: string
}