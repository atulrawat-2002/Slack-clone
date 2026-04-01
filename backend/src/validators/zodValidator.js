import { StatusCodes } from "http-status-codes"

import { customErrorResponse } from "../utils/responseObjects.js"

export const validate = (schema) => {
    return async(req, res, next) => {
        try {
            
            await schema.parseAsync(req.body)
            next();

        } catch (error) {
            let obj = JSON.parse(error.message)
            console.log('Error in the validation of request', error.message);
            res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse({message: obj[0].message}))
        }
    }
} 
