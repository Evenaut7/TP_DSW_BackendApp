import { Entity, PrimaryKey, Property, Cascade, DecimalType, ManyToMany, OneToMany, Collection, ManyToOne, Rel } from "@mikro-orm/core"
import { BaseEntity } from "../shared/db/baseEntity.entity.js"
import { Evento } from "../evento/evento.entity.js"
import { Tag } from "../tag/tag.entity.js"
import { Valoracion } from "../valoracion/valoracion.entity.js"
import { Localidad } from "../localidad/localidad.entity.js"
import { Usuario } from "../usuario/usuario.entity.js"
import { Historia } from "../historia/historia.entity.js";


@Entity()
export class PuntoDeInteres extends BaseEntity {

  @Property({ nullable: false, unique: true, type: 'string' })
  nombre!: string

  @Property({ nullable: false, unique: false, type: 'string' })
  descripcion!: string

  @Property({ nullable: false, unique: false, type: 'string'})
  imagen!: string

  @Property({ nullable: false, unique: false, type: 'string' })
  calle!: string

  @Property({ nullable: false, unique: false, type: 'number' })
  altura!: Number

  @Property({ nullable: true, type: DecimalType, columnType: 'double' })
  lat?: number

  @Property({ nullable: true, type: DecimalType, columnType: 'double' })
  lng?: number

  @Property({ nullable: false, unique: false, type: 'boolean' })
  privado!: boolean

  @ManyToMany(() => Tag, (tag) => tag.puntosDeInteres, { nullable: true, owner: true})
  tags = new Collection<Tag>(this)

  @OneToMany(() => Evento, (evento) => evento.puntoDeInteres, { nullable: true, cascade: [Cascade.ALL] })
  eventos = new Collection<Evento>(this)

  @OneToMany(() => Valoracion, (valoracion) => valoracion.puntoDeInteres, { nullable: true, cascade: [Cascade.ALL] })
  valoraciones = new Collection<Valoracion>(this)

  @ManyToOne(() => Usuario, { nullable: false, cascade: [Cascade.ALL] })
  usuario!: Rel<Usuario>;

  @ManyToMany(() => Usuario, (usuario) => usuario.favoritos, { nullable: true })
  favoritoDe = new Collection<Usuario>(this);

  @ManyToOne(() => Localidad, { nullable: false, cascade: [Cascade.ALL] })
  localidad!: Rel<Localidad>;

  @OneToMany(() => Historia, (historia) => historia.puntoDeInteres, { nullable: true, cascade: [Cascade.ALL] })
  historias = new Collection<Historia>(this);

  //Agregar agenda usuario
}