import { Entity, PrimaryKey, Property, Cascade, DecimalType, ManyToMany, ManyToOne, Rel, Collection } from "@mikro-orm/core"
import { BaseEntity } from "../shared/db/baseEntity.entity.js"
import { PuntoDeInteres } from "../puntoDeInteres/puntoDeInteres.entity.js"
import { Tag } from "../tag/tag.entity.js"
import { Usuario } from "../usuario/usuario.entity.js"

@Entity()
export class Evento extends BaseEntity {

  @Property({nullable: false, unique: true, type: 'string'})
  titulo!: string

  @Property({nullable: false, unique: true, type: 'string'})
  descripcion!: string

  @Property({nullable: false, unique: false, type: 'date'})
  horaDesde!: Date

  @Property({nullable: false, unique: false, type: 'date'})
  horaHasta!: Date

  @Property({nullable: false, unique: false, type: 'string'}) //“Disponible”, “Cancelado”
  estado!: string

  @ManyToMany( () => Tag, (tag) => tag.eventos, { nullable: true, owner: true})
  tags!: Tag[]

  @ManyToOne(() => PuntoDeInteres, { nullable: false, onDelete: 'CASCADE' })
  puntoDeInteres!: Rel<PuntoDeInteres>

  @ManyToMany(() => Usuario, (usuario) => usuario.agendaEvento, { nullable: true })
  usuarios = new Collection<Usuario>(this);
}