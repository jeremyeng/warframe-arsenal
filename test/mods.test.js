import { graphql } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import knex from '../db/knex';
import schema from '../src/schema';
import resolvers from '../src/resolvers';
import loaders from '../src/loaders';

beforeAll(() => knex.migrate
  .rollback()
  .then(() => knex.migrate.latest())
  .then(() => knex.seed.run()));

afterAll(() => knex.migrate.rollback().then(() => knex.destroy()));

const executableSchema = makeExecutableSchema({ typeDefs: schema, resolvers });
describe('mods', () => {
  describe('querying mods', () => {
    test('fetch a list of all mods', async () => {
      const query = `
        query {
          mods {
            id
            name
            description
            baseDrain
            fusionLimit
            type
            polarity
            data
          }
        }
      `;
      const {
        data: { mods },
      } = await graphql(executableSchema, query, {}, { knex, loaders });

      expect(mods.length).toBe(828);
    });

    test('fetch a mod by its id', async () => {
      const query = `
        query {
          mod(id:203) {
            id
            name
            description
            baseDrain
            fusionLimit
            type
            polarity
            data
          }
        }
      `;
      const {
        data: { mod },
      } = await graphql(executableSchema, query, {}, { knex, loaders });

      expect(mod).toMatchObject({
        id: '203',
        name: 'Energy Inversion',
        description: '+30% Shield Capacity',
        baseDrain: 2,
        fusionLimit: 3,
        type: 'Archwing',
        polarity: 'vazarin',
        data: {
          effect: ['+30%', '+60%', '+90%', '+120%'],
        },
      });
    });
  });
});
