import { Entity, Property, ManyToOne, Rel, Cascade, OneToMany, Collection } from "@mikro-orm/core";
import { Provincia } from "../provincia/provincia.entity.js";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { PuntoDeInteres } from "../puntoDeInteres/puntoDeInteres.entity.js";
import { Usuario } from "../usuario/usuario.entity.js";


@Entity()
export class Localidad extends BaseEntity {
    @Property({ nullable: false, unique: true , type: 'string'})
    nombre!: string

    @Property({ nullable: true, type: 'float' })
    latitud!: number

    @Property({ nullable: true, type: 'float' })
    longitud!: number

    @Property({ nullable: true})
    imagen?: string;

    @ManyToOne(() => Provincia, { nullable: false , cascade: [ Cascade.ALL ] })
    provincia!: Rel<Provincia>;

    @OneToMany(() => PuntoDeInteres, (PuntoDeInteres) => PuntoDeInteres.localidad, { nullable: true, cascade: [Cascade.ALL] })
    puntosDeInteres = new Collection<PuntoDeInteres>(this);

    @OneToMany(()=> Usuario, (usuario) => usuario.localidad, {nullable: true }) //cascade: [Cascade.CANCEL_ORPHAN_REMOVAL] 
    usuarios = new Collection <Usuario> (this)
}