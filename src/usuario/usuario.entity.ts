import { Entity, Property, Cascade, ManyToMany, Collection, ManyToOne, Rel, OneToMany, PrimaryKey } from "@mikro-orm/core"
import { BaseEntity } from "../shared/db/baseEntity.entity.js"
import { Localidad } from "../localidad/localidad.entity.js"
import { PuntoDeInteres } from "../puntoDeInteres/puntoDeInteres.entity.js"
import { Evento } from "../evento/evento.entity.js"
import { Valoracion } from "../valoracion/valoracion.entity.js"

@Entity()
export class Usuario{

  // Estos campos los va a manejar Clerk, no nosotros.

  @PrimaryKey({ nullable: false,  unique: true , type: 'string'})
  clerkUserId!: string

  @Property({ nullable: false,  unique: true, type: 'string' })
  gmail!: string //mi indice y constraint

  @Property({ nullable: true,  unique: true , type: 'string'})
  nombreUsuario?: string

  // Estos campos ahora son OPCIONALES/NULABLES (nullable: true) para el lazy upsert.

  @Property({ nullable: true,  unique: false , type: 'string'})
  nombre?: string

  @Property({ nullable: true,  unique: false, type: 'string' })
  tipo?: string

  // @Property({ nullable: true, unique: false, type: 'string'})
  // password?: string

  // @Property({ nullable: true,  unique: true, type: 'string' })
  // cuit?: string

  @ManyToOne(() => Localidad,  { nullable: true })
  localidad? : Rel<Localidad>

  @OneToMany(() => PuntoDeInteres, (puntoDeInteres) => puntoDeInteres.usuario,  { nullable: true , cascade: [ Cascade.ALL ] })
  puntosDeInteres = new Collection<PuntoDeInteres>(this)

  @ManyToMany(() => PuntoDeInteres, (puntoDeInteres) => puntoDeInteres.favoritoDe,  { nullable: true , owner: true})
  favoritos = new Collection<PuntoDeInteres>(this)

  @OneToMany(() => Evento, (evento) => evento.usuario,  { nullable: true , cascade: [ Cascade.ALL ] })
  agendaPDI = new Collection<Evento>(this)

  @OneToMany(()=> Valoracion, (valoracion) => valoracion.usuario, { nullable: true, cascade: [ Cascade.ALL ] })
  valoraciones = new Collection<Valoracion>(this)
}