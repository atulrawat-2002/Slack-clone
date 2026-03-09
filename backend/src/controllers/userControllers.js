import { StatusCodes } from "http-status-codes";

import { signupService } from "../services/signupService.js";
import { customErrorResponse, internalServerError, successResponse } from "../utils/responseObjects.js";

export const signupController = async (req, res) => {

    try {

        const user = await signupService(req.body);
        res.status(StatusCodes.CREATED).json(successResponse(user, 'User Created Successfully'))
        
    } catch (error) {
        // if(error.statusCode) {
            console.log("Custom Error signup controller ", error);
            return res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse(error));
        // }
        // console.log("Internal Error signup controller ", error);
        // return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        // .json(internalServerError(error));
    }

}