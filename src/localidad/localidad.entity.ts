import { Entity, Property, ManyToOne, Rel, Cascade, OneToMany, Collection, DecimalType } from '@mikro-orm/core';
import { Provincia } from '../provincia/provincia.entity.js';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { PuntoDeInteres } from '../puntoDeInteres/puntoDeInteres.entity.js';
import { Usuario } from '../usuario/usuario.entity.js';

@Entity()
export class Localidad extends BaseEntity {
  @Property({ nullable: false, unique: true, type: 'string' })
  nombre!: string;

  @Property({ nullable: true, type: 'string' })
  imagen?: string;

  @Property({ nullable: true, unique: false, type: 'string' })
  descripcion?: string;

  @Property({ nullable: false, type: DecimalType, columnType: 'double' })
  lat!: number

  @Property({ nullable: false, type: DecimalType, columnType: 'double' })
  lng!: number

  @ManyToOne(() => Provincia, { nullable: false })
  provincia!: Rel<Provincia>;

  @OneToMany(() => PuntoDeInteres, (PuntoDeInteres) => PuntoDeInteres.localidad, { nullable: true, cascade: [Cascade.ALL] })
  puntosDeInteres = new Collection<PuntoDeInteres>(this);

  @OneToMany(() => Usuario, (usuario) => usuario.localidad, { nullable: true })
  usuarios = new Collection<Usuario>(this);
}
