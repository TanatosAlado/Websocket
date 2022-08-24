/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('ecommerce').del()
  await knex('ecommerce').insert([
    {id: 1, email: 'cale@hot.com', mensaje: "Hola mundo", date: "23/8"},
    {id: 2, email: 'ssan@hot.com', mensaje: "Hola buey", date: "24/8"},
  ]);
};
