import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cards'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('card_holder_name').notNullable()
      table.string('card_holder_document').notNullable()
      table.string('card_holder_agency').notNullable()
      table.string('card_holder_account').notNullable()
      table.string('card_holder_number').notNullable()
      table.string('card_holder_security_number').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
