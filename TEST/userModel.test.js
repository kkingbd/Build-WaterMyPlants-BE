const { users } = require('../data/userModel.js');

describe.skip('Users Model', () => {
  describe('getUsers()', () => {
    it('should return an array of objects', async () => {
      const getUsersMock = jest.spyOn(users, 'getUsers');
      const userList = getUsersMock();
      expect(userList).not.toBeNull();
      expect(userList).not.toBeUndefined();
    });
  });
  describe('findById', () => {
    it('should return a user with a valid id', async () => {
      const user = await users.finfById(1);
      expect(user).not.toBeNull();
      expect(user).toEqual(expect.objectContaining({ username: 'md' }));
    });
  });
})