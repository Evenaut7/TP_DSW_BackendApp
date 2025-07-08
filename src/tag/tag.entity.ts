import { Entity, PrimaryKey, Property, Cascade } from "@mikro-orm/core"
import { BaseEntity } from "../shared/db/baseEntity.entity.js"

@Entity()
export class tag extends BaseEntity {
  
  @Property({nullable: false, unique: true})
  nombre!: string
  
  @Property()
  descripcion!: string
  
  @Property({unique: true})
  tipo!: string
  
  //tags: Tag[]
}