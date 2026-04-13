import User from '../schemas/user.js';
import { createJWT } from '../utils/authUtils.js';
import crudRepository from './crudRepository.js';

const userRepository = {
  ...crudRepository(User),
  
  signUpUser: async function (data) {
    const newUser = new User(data);
    await newUser.save();
    const {
      createdAt,
      updatedAt,
      isVerified,
      password,
      verificationToken,
      verificationTokenExpiry,
      _v,
      ...returnable
    } = newUser.toObject();
    return {
      ...returnable,
      token: createJWT({id: returnable._id, email: returnable.email})
    };
  },

  getUserByEmail: async function (email) {
    const user = await User.findOne({ email: email });
    return user;
  },

  getUserByName: async function (name) {
    const user = await User.findOne({ username: name }).select('-password');
    return user;
  },
  getByToken: async function( token ) {
    const user = await User.findOne({ verificationToken: token });
    return user;
  }
};


export default userRepository;
