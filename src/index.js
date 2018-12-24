require('dotenv').config();
const express = require('express');
const { postgraphile } = require('postgraphile');
const knexMigrate = require('knex-migrate');

const log = ({ action, migration }) => {
  // eslint-disable-next-line no-console
  console.log('Doing ' + action + ' on ' + migration);
};

async function migrateUpToLatest() {
  await knexMigrate('down', { to: 0 }, log);
  await knexMigrate('up', {}, log);
}

async function startServer() {
  migrateUpToLatest();

  // const app = express();
  // app.use(
  //   postgraphile(
  //     {
  //       host: process.env.DATABASE_URL,
  //       database: process.env.DATABASE_NAME,
  //       user: process.env.POSTGRAPHILE_DATABASE_USER,
  //       password: process.env.POSTGRAPHILE_DATABASE_PASSWORD,
  //     },
  //     'warframe_arsenal_public',
  //     {
  //       graphiql: true,
  //       enhanceGraphiql: true,
  //       pgDefaultRole: 'guest',
  //       jwtPgTypeIdentifier: 'warframe_arsenal_public.jwt',
  //       jwtSecret:
  //         '29E357812E4D2664C6FD9764D28B9BA958CC995D216C0C8A837039D7C6B43FD0',
  //     },
  //   ),
  // );

  // app.listen({ port: process.env.PORT || 8081 }, () => {
  //   // eslint-disable-next-line no-console
  //   console.log(
  //     `Server running on http://localhost:${process.env.PORT || 8081}/graphiql`,
  //   );
  // });
}

startServer();
