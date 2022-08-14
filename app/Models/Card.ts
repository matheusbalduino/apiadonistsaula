import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Card extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({})
  public card_holder_name: number

  @column({})
  public card_holder_document: number

  @column({})
  public card_holder_agency: number

  @column({})
  public card_holder_account: number

  @column({})
  public card_holder_number: number

  @column({})
  public card_holder_security_number: number

  @column({})
  public userId: number

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
