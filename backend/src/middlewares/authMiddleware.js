import { StatusCodes } from "http-status-codes";
import { customErrorResponse, internalServerError } from "../utils/responseObjects.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/serverConfigs.js";
import userRepository from "../repositories/userRepository.js";

export const isAuthenticated = async (req, res, next) => {

    try {
        
        const token = req.headers['x-access-token'];

        if(!token) {
            console.log('token not found')
            res.status(StatusCodes.FORBIDDEN).json(customErrorResponse({
                message: 'auth token not presented'
            }));
            return;
        }

        const result = jwt.verify(token, JWT_SECRET);

        if(!result) {
            console.log('token not matched')
            res.status(StatusCodes.FORBIDDEN).json(customErrorResponse({
                message: 'Invalid token'
            }))
            return;
        }

        const user = await userRepository.getById(result.id);
        req.user = user.id;

        next();

    } catch (error) {
        console.log('Auth middleware error', error.message);
        if(error.name === 'jsonWebTokenError') {
             return res.status(StatusCodes.FORBIDDEN).json(customErrorResponse({
                message: 'Invalid token'
            }))   
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerError())
    }

}