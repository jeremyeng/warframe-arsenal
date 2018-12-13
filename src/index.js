const express = require('express');
const { postgraphile } = require('postgraphile');

const app = express();

app.use(
  postgraphile(
    process.env.DATABASE_URL || 'postgres:///warframe_arsenal',
    'warframe_arsenal_public',
    {
      graphiql: true,
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
