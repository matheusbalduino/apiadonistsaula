import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

import Hash from '@ioc:Adonis/Core/Hash'
import Address from './Address'
import Card from './Card'
import Contact from './Contact'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column({ serializeAs: null })
  public password: string

  @column({ columnName: 'firstName' })
  public firstName: string

  @column({ columnName: 'lastName' })
  public lastName: string

  @column()
  public email: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) user.password = await Hash.make(user.password)
  }

  /**
   * Relationships
   */
  @hasMany(() => Address, { foreignKey: 'userId' })
  public address: HasMany<typeof Address>

  @hasMany(() => Card)
  public card: HasMany<typeof Card>

  @hasMany(() => Contact)
  public contact: HasMany<typeof Contact>
}
