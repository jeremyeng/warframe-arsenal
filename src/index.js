import 'app-module-path/cwd';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import schema from 'src/schema';
import resolvers from 'src/resolvers';
import knex from 'db/knex';

const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    knex,
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});
