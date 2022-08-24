/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('ecommerce', table => {
        table.increments('id').primary().notNullable();
        table.string('email', 255).notNullable();
        table.string('mensaje', 255).notNullable();
        table.string('date', 255).notNullable();
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('ecommerce');
};
