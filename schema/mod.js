import knex from '../db/knex';

async function fetchModData() {
  const results = await knex.select().from('mod'); 
  return results;
}

export const typeDef = `
  extend type Query {
    mods: [Mod!]!
  }

  type Mod {
    id: ID!
    name: String!
    description: String!
    polarity: String!  
  }
`;

export const resolvers = {
  Query: {
    mods: fetchModData
  },

  Mod: {
    id: root => root.id,
    name: root => root.name,
    description: root => root.description,
    polarity: root => root.polarity
  }
}