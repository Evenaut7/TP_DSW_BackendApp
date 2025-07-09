import { Entity, PrimaryKey, Property, Cascade } from "@mikro-orm/core"
import { BaseEntity } from "../shared/db/baseEntity.entity.js"

@Entity()
export class Tag extends BaseEntity {
  
  @Property({nullable: false, unique: true})
  nombre!: string
  
  @Property({unique: false})
  descripcion!: string
  
  @Property({unique: false})
  tipo!: string
  
  //tags: Tag[]
}