module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://localhost/warframe_arsenal_test',
    migrations: {
      directory: `${__dirname}/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/db/seeds`,
    },
    searchPath: ['warframe_arsenal_public', 'public'],
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
    searchPath: ['warframe_arsenal_public', 'public'],
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: `${__dirname}/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/db/seeds/production`,
    },
    searchPath: ['warframe_arsenal_public', 'public'],
  },
};
