import { StatusCodes } from "http-status-codes";
import { getPaginatedMessagesService } from "../services/messageService.js";
import { customErrorResponse, successResponse } from "../utils/responseObjects.js";
import { getPaginatedDmsService } from "../services/dmService.js";

export const getPaginatedMessagesController = async (req, res) => {
    try {
        
        const response = await getPaginatedMessagesService({
            channelId: req.params.channelId,
            workSpaceId: req.params.workSpaceId,
        },
        req.query.page || 1,
        req.query.limit || 20,
        req.user
    );

    return res.status(StatusCodes.OK).json(successResponse(response, 'Fetched message successfully'));

    } catch (error) {

        console.log('getPaginatedMessagesController error', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(customErrorResponse(error))
    }
}


export const getPaginatedDmsController = async (req, res) => {
    try {
        
        const response = await getPaginatedDmsService({
            conversationId: req.params.conversationId               
        },
        req.query.page || 1,
        req.query.limit || 20,
        req.user
    )


    return res.status(StatusCodes.OK).json(successResponse(response, 'Fetched dms successfully'));

    } catch (error) {

        console.log('getPaginatedDmsController error', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(customErrorResponse(error))
    }
}