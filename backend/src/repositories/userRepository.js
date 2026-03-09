import User from '../schemas/user';
import crudRepository from './crudRepository';

const userRepository = {
  ...crudRepository(User),
  
  getUserByEmail: async function (email) {
    const user = await User.findOne({ email: email });
    return user;
  },

  getUserByName: async function (name) {
    const user = await User.findOne({ username: name });
    return user;
  }
};


export default userRepository;
