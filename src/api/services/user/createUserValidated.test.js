const { withCleanDb } = require('@/src/common/utils/testHelpers');
const bcrypt = require('bcryptjs');
const { createUserValidated } = require('@/src/api/services/user/createUserValidated');
const User = require('@/src/api/services/user/data/User');

jest.mock('@/src/api/services/user/index');
describe('', () => {
  beforeEach(withCleanDb);

  const userData = {
    username: 'jBalvIN',
    name: 'Jose',
    email: 'jbalvin@elnegocio.socio',
    password: '12345'
  };

  it('should create user with encrypted password', async () => {
    const { user } = await createUserValidated(userData);

    expect(user.name).toBe('Jose');
    expect(user.username).toBe('jbalvin');
    expect(user.email).toBe('jbalvin@elnegocio.socio');
    expect(await bcrypt.compare('12345', user.originalPassword)).toBeTruthy();
  });

  it('should return an error for an invalid email', async () => {
    const invalidUser = { ...userData, email: 'notanemail' };
    const result = await createUserValidated(invalidUser);
    expect(result).toEqual({
      error: { message: 'The email you entered is invalid.', code: 400 }
    });
  });

  it('should return an error if the email has already been used', async () => {
    User.findUserByEmail.mockResolvedValueOnce(true);
    const result = await createUserValidated(userData);
    expect(result).toEqual({
      error: { message: 'The email has already been used.', code: 403 }
    });
  });

  it('should return an error if the username has already been taken', async () => {
    User.findUserByUsername.mockResolvedValueOnce(true);
    const result = await createUserValidated(userData);
    expect(result).toEqual({
      error: { message: 'The username has already been taken.', code: 403 }
    });
  });
});
