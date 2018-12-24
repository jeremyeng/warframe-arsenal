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
    ).first();
    const createdUserAccount = await knex(
      knex.ref('user_accounts').withSchema('warframe_arsenal_private'),
    ).first();

    expect(createdUser.user_id === createdUserAccount.user_id);
    expect(createdUser.username).toBe(user.username);
    expect(createdUserAccount.email).toBe(user.email);
    expect(createdUserAccount.confirmed === false);
  });
});
