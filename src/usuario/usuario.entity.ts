import { Entity, Property, Cascade, ManyToMany, Collection, ManyToOne, Rel, OneToMany } from "@mikro-orm/core"
import { BaseEntity } from "../shared/db/baseEntity.entity.js"
import { Localidad } from "../localidad/localidad.entity.js"
import { PuntoDeInteres } from "../puntoDeInteres/puntoDeInteres.entity.js"
import { Evento } from "../evento/evento.entity.js"
import { Valoracion } from "../valoracion/valoracion.entity.js"

@Entity()
export class Usuario extends BaseEntity{

  @Property({ nullable: true,  unique: true , type: 'string'})
  clerkUserId?: string

  // Estos campos ahora son OPCIONALES/NULABLES (nullable: true) para el lazy upsert.
  // Si el usuario ya existe con auth local, estos tendrán valor.
  // Si es un nuevo usuario de Clerk, solo tendrá el clerkUserId inicialmente.

  @Property({ nullable: true,  unique: true , type: 'string'})
  nombre?: string

  @Property({ nullable: true,  unique: false, type: 'string' })
  tipo?: string

  @Property({ nullable: true,  unique: true, type: 'string' })
  cuit?: string

  @Property({ nullable: true,  unique: true, type: 'string' })
  gmail?: string //lo gestiona clerk

  @Property({ nullable: true, unique: false, type: 'string'})
  password?: string

  @ManyToOne(() => Localidad,  { nullable: false , cascade: [ Cascade.ALL ] })
  localidad! : Rel<Localidad>

  @OneToMany(() => PuntoDeInteres, (puntoDeInteres) => puntoDeInteres.usuario,  { nullable: true , cascade: [ Cascade.ALL ] })
  puntosDeInteres = new Collection<PuntoDeInteres>(this)

  @ManyToMany(() => PuntoDeInteres, (puntoDeInteres) => puntoDeInteres.favoritoDe,  { nullable: true , owner: true})
  favoritos = new Collection<PuntoDeInteres>(this)

  @OneToMany(() => Evento, (evento) => evento.usuario,  { nullable: true , cascade: [ Cascade.ALL ] })
  agendaPDI = new Collection<Evento>(this)

  @OneToMany(()=> Valoracion, (valoracion) => valoracion.usuario, { nullable: true})
  valoraciones = new Collection<Valoracion>(this)
}