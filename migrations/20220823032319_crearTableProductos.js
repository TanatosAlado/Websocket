/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('misproductos', table => {
    table.increments('id').primary().notNullable();
    table.string('nombre', 255).notNullable();
    table.integer('precio').notNullable();
    table.string('imagen', 255).notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('misproductos');
};
