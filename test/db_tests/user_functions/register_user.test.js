const knex = require('../../../db/knex');

describe('register_user function', () => {
  test('register a new user', async () => {
    const user = {
      username: 'oatmealsoldier',
      email: 'oatmealsoldier@oatmealsoldier.com',
      password: 'password',
    };
    await knex.select(
      knex.raw(
        'warframe_arsenal_public.register_user(:username, :email, :password)',
        user,
      ),
    );

    const createdUser = await knex(
      knex.ref('users').withSchema('warframe_arsenal_public'),
    );
    const createdUserAccount = await knex(
      knex.ref('user_accounts').withSchema('warframe_arsenal_private'),
    );

    expect(createdUser[0].username).toBe(user.username);
    expect(createdUserAccount[0].email).toBe(user.email);
  });
});
