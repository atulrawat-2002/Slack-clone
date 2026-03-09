import userRepository from "../repositories/userRepository.js";
import { customErrorResponse } from "../utils/responseObjects.js";

export async function signupService(data) {
    try {
        const newUser = await userRepository.create(data);
        return newUser;
    } catch (error) {
        console.log(error.message)
        throw customErrorResponse(error)
    }
}