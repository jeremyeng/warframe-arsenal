module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://localhost/warframe_arsenal',
    migrations: {
      directory: `${__dirname}/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/db/seeds`,
    },
  },
  development: {
    client: 'pg',
    connection: 'postgres://localhost/warframe_arsenal',
    migrations: {
      directory: `${__dirname}/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/db/seeds`,
    },
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_URL,
      database: process.env.DATABASE_NAME,
      user: process.env.KNEX_DATABASE_USER,
      password: process.env.KNEX_DATABASE_PASSWORD,
    },
    migrations: {
      directory: `${__dirname}/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/db/seeds/production`,
    },
  },
};
