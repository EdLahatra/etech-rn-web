import users from '../bdl/users';

export default {
  signin: async (url, data) => await users.signin(url, data),
  signup: async (url, data) => await users.signup(url, data),
};
