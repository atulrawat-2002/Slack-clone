import { StatusCodes } from "http-status-codes";
import { getChannelByIdService } from "../services/channelService.js"
import { customErrorResponse, successResponse } from "../utils/responseObjects.js";

export const getChannelByIdController = async (req, res) => {
    try {
        
        const response = await getChannelByIdService(req.params.channelId, req.user);

        return res.status(StatusCodes.OK).json(successResponse(response, 'Got channel successfully'))

    } catch (error) {   
        console.log('Error inside get channel by id Controller', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(customErrorResponse(error))
    }
}