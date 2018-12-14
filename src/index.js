const express = require('express');
const { postgraphile } = require('postgraphile');

const app = express();

app.use(
  postgraphile(
    { connectionString: 'postgres:///warframe_arsenal' },
    'warframe_arsenal_public',
    {
      graphiql: true,
      pgDefaultRole: 'jeremy',
      jwtPgTypeIdentifier: 'warframe_arsenal_public.jwt',
      jwtSecret:
        '29E357812E4D2664C6FD9764D28B9BA958CC995D216C0C8A837039D7C6B43FD0',
    },
  ),
);

app.listen({ port: process.env.DATABASE_URL || 8000 }, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Server running on http://localhost:${process.env.DATABASE_URL ||
      8000}/graphiql`,
  );
});
