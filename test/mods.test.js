import axios from 'axios';
import knex from '../db/knex';

afterAll(() => knex.destroy());
beforeEach(() => knex.migrate
  .rollback()
  .then(() => knex.migrate.latest())
  .then(() => knex.seed.run()));

afterEach(() => knex.migrate.rollback());

describe('mods', () => {
  describe('querying mods', () => {
    test('fetch a list of all mods', async () => {
      const {
        data: {
          data: { mods },
        },
      } = await axios.post('http://localhost:8000/graphql', {
        query: `
            {
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
          `,
      });

      expect(mods.length).toBe(830);
    });

    test('fetch a mod by its id', () => axios
      .post('http://localhost:8000/graphql', {
        query: `
            {
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
          `,
      })
      .then((result) => {
        expect(result.data).toMatchObject({
          data: {
            mod: {
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
            },
          },
        });
      }));
  });
});
