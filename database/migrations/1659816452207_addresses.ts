import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('street').notNullable()
      table.string('number').notNullable()
      table.string('complement')
      table.string('neighborhood').notNullable()
      table.string('zip_code').notNullable()
      table.string('state').notNullable()
      table.string('country').notNullable()
      table.string('description')
      table.integer('userId').unsigned().references('id').inTable('users')

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
