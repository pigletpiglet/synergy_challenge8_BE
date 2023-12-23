import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('cars', (table: Knex.TableBuilder) => {
    table.bigIncrements('id').primary();
    table.text('content');
    table.string('name', 30).notNullable();
    table.string('size', 30).notNullable();
    table.bigInteger('user_id');
    table.boolean('deleted');
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.bigInteger('price').notNullable;
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('cars');
}
