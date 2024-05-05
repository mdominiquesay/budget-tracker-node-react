/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('budget', function(table) {
    table.increments('id').primary();
    table.integer('budget_id').notNullable();
    table.float('amount').notNullable();
    table.string('category').notNullable();
    table.string('description').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('budget');
};
