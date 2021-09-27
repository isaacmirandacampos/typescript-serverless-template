// Update with your config settings.
require('dotenv').config()

module.exports = {
  development: {
    client: 'postgresql',
    connection: process.env.DB_CONNECTION_TEST,
    migrations: {
      directory: './app/shared/db/migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './app/shared/db/seeds',
      extension: 'ts',
    },
  },
  test: {
    client: 'postgresql',
    connection: process.env.DB_CONNECTION_TEST,
    migrations: {
      directory: './app/shared/db/migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './app/shared/db/seeds',
      extension: 'ts',
    },
  },
  production: {
    client: 'postgresql',
    connection: process.env.DB_CONNECTION,
    migrations: {
      directory: './app/shared/db/migrations',
      extension: 'ts',
    },
  },
}
