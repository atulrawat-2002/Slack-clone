import userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import { createJWT } from "../utils/authUtils.js";

export const signinService = async (data) => {
    try {
        
        const user = await userRepository.getUserByEmail(data.email);
        if(!user) {
            throw new Error('User not found');
        }

        const hashedPasword = user.password;
        const isMatched = bcrypt.compareSync(data.password, hashedPasword);

        if(!isMatched) {
            throw new Error('Invalid password');
        }

        return {
            username: user.username,
            avatar: user.avatar,
            email: user.email,
            _id: user._id,
            token: createJWT({id: user._id, email: user.email})
        }

    } catch (error) {
        console.log('Signin service error', error.message);
        throw new Error(error);
    }   
}