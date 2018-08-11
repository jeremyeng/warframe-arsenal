import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';
import { typeDef as Mod, resolvers as modResolvers } from './mod';

const Query = `
  type Query {
    _empty: String
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [Query, Mod],
  resolvers: merge({}, modResolvers)
});
