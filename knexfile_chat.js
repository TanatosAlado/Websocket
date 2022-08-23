// require ("dotenv").config();

const knexConfigChat = {
    client: 'sqlite3',
    connection: {
      filename: 'ecommerce.sqlite'
    },
    useNullAsDefault: true,
    migration: {
        tableName: 'knex_migrations',
        directory: './migrations'
    },
    seeds: {
        tableName: 'knex_seeds',
        directory: './seeds'
    }
}


module.exports = knexConfigChat;