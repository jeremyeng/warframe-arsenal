const express = require('express');
const { postgraphile } = require('postgraphile');

const app = express();

app.use(
  postgraphile(
    {
      host: process.env.DATABASE_URL,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    },
    'warframe_arsenal_public',
    {
      graphiql: true,
      pgDefaultRole: 'registered_user',
      jwtPgTypeIdentifier: 'warframe_arsenal_public.jwt',
      jwtSecret:
        '29E357812E4D2664C6FD9764D28B9BA958CC995D216C0C8A837039D7C6B43FD0',
    },
  ),
);

app.listen({ port: process.env.PORT || 8081 }, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Server running on http://localhost:${process.env.PORT || 8081}/graphiql`,
  );
});
