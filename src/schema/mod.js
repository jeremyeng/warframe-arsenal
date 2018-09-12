import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    mod(id: ID!): Mod
    mods: [Mod!]!
  }

  type Mod {
    id: ID!
    name: String!
    description: String!
    baseDrain: Int!
    fusionLimit: Int!
    type: String
    polarity: String!
    data: JSON
  }
`;
