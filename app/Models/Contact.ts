import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Contact extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({})
  public type: string

  @column({})
  public ddd: string

  @column({})
  public number: string

  @column({ columnName: 'userId' })
  public userId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /**
   * RELATIONSHIP
   */
  @belongsTo(() => User, { foreignKey: 'userId' })
  public user: BelongsTo<typeof User>
}
