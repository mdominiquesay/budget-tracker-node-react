/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('category', function(table) {
    table.increments('id').primary();
    table.integer('category_id').notNullable(); // Changed column name from 'category' to 'category_id'
    table.string('category_'); 
    table.boolean('is_deleted'); // Changed column name from 'delete' to 'is_deleted'
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('category');
};
