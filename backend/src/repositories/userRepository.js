import User from '../schemas/user.js';
import crudRepository from './crudRepository.js';

const userRepository = {
  ...crudRepository(User),
  
  getUserByEmail: async function (email) {
    const user = await User.findOne({ email: email });
    return user;
  },

  getUserByName: async function (name) {
    const user = await User.findOne({ username: name }).select('-password');
    return user;
  }
};


export default userRepository;
