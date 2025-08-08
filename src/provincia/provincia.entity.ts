import { Cascade, Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { Localidad } from "../localidad/localidad.entity.js";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

@Entity()
export class Provincia extends BaseEntity {
    @Property({nullable: false, unique: true, type: 'string'})
    nombre!: string
    
    @OneToMany(() => Localidad, Localidad => Localidad.provincia, {nullable: true, cascade: [Cascade.ALL]})
    localidades = new Collection<Localidad>(this)
}