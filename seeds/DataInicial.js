/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('misproductos').del()
  await knex('misproductos').insert([
    {nombre: 'Rutini', precio: '2980'},
    {nombre: 'Alambrado', precio: '1300'},
  ]);
};
