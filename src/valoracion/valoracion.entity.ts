import { Entity, PrimaryKey, Property, Cascade, ManyToMany, Collection, ManyToOne, Rel} from "@mikro-orm/core"
import { BaseEntity } from "../shared/db/baseEntity.entity.js"
import { Evento } from "../evento/evento.entity.js"
import { PuntoDeInteres } from "../puntoDeInteres/puntoDeInteres.entity.js"
import { Usuario } from "../usuario/usuario.entity.js"


@Entity()
export class Valoracion extends BaseEntity {

  @Property({nullable: false, unique: false, type: 'string'})
  comentario!: string 

  @Property({nullable: false, unique: false, type: 'number'})
  cantEstrellas!: number 

  @Property({nullable: false, unique: false, type: 'date'})
  fechaHora!: Date

  @ManyToOne( () => PuntoDeInteres, {nullable: false, unique: false})
  puntoDeInteres!: Rel<PuntoDeInteres>

  @ManyToOne(()=> Usuario, { nullable: false})
  usuario!: Rel<Usuario>
}