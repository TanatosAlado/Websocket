require ("dotenv").config();

const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
const DATABASE_PORT = process.env.DATABASE_PORT || "3306";
const DATABASE_USER = process.env.DATABASE_USER || "root";
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "";
const DATABASE_NAME = process.env.DATABASE_NAME || "productos_db";

const knexConfig = {
    client: 'mysql',
    connection: {
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
    },
    migration: {
        tableName: 'knex_migrations',
        directory: './migrations'
    },
    seeds: {
        tableName: 'knex_seeds',
        directory: './seeds'
    }
}


module.exports = knexConfig;