import { gql } from 'apollo-server-express';
import jsonSchema from './json';
import modSchema from './mod';

const baseSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;


export default [baseSchema, jsonSchema, modSchema];
