import { PrimaryKey, DateTimeType } from "@mikro-orm/core"

export abstract class BaseEntity {
  @PrimaryKey({type: 'number'})
  id?: number

  /*

  @Property({ type: DateTimeType })
  createdAt? = new Date()

  @Property({
    type: DateTimeType,
    onUpdate: () => new Date(),
  })
  updatedAt? = new Date()

  */

}