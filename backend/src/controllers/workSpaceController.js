import { StatusCodes } from "http-status-codes";
import { customErrorResponse, successResponse } from "../utils/responseObjects.js";
import { addChannelToWorkSpaceService, addMemberToWorkSpaceService, createWorkSpaceService, deleteWorkSpaceService, getAllWorkSpaceUserIsMemberOfService, getWorkSpaceByJoinCodeService, getWorkSpaceService, updatedWorkSpaceService } from "../services/workSpaceService.js";

export const createWorkSpaceController = async (req, res) => {
    try {
        const response = await createWorkSpaceService({
            ...req.body,
            owner: req.user
        })
        return res.status(StatusCodes.CREATED).json(
            successResponse(response, 'Work space created successfully')
        )
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(customErrorResponse(error));
    }
}


export const getAllWorkSpaceUserIsMemberOfController = async (req, res) => {
    try {
        const response = await getAllWorkSpaceUserIsMemberOfService(req.user);

        return res.status(StatusCodes.OK).json(successResponse(response, 'Got all workspaces successfully'));

    } catch (error) {
        console.log('Get all work space user is member of controller error', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(customErrorResponse(error))
    }
}


export const deleteWorkSpaceController = async (req, res) => {
    try {
        const response = await deleteWorkSpaceService(
            req.params.workSpaceId,
            req.user
        );

        return res.status(StatusCodes.OK).json(successResponse(response, 'Deleted the workspace successfully'));

    } catch (error) {
        console.log('delete workspace controller error', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(customErrorResponse(error))
    }
} 


export const getWorkSpaceController = async (req, res) => {
    try {
        const response = await getWorkSpaceService(
            req.params.workSpaceId,
            req.user
        );

        return res.status(StatusCodes.OK).json(successResponse(response, 'fetched the workspace successfully'));

    } catch (error) {
        console.log('get workspace controller error', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(customErrorResponse(error))
    }
} 

export const getWorkSpaceByJoinCodeController = async (req, res) => {

    try {
        const response = await getWorkSpaceByJoinCodeService(
            req.params.joinCode,
            req.user
        );

        return res.status(StatusCodes.OK).json(successResponse(response, 'fetched the workspace successfully'));

    } catch (error) {
        console.log('get workspace controller error', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(customErrorResponse(error))
    }
} 

export const updatedWorkSpaceController = async (req, res) => {
    try { 
        console.log(req.body)
        const response = updatedWorkSpaceService(
        req.params.workSpaceId.
        req.body,
        req.user
    )
        return res.status(StatusCodes.OK).json(successResponse(response, 'updated the workspace successfully'));
    } catch (error) {
        console.log('update workspace controller error', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(customErrorResponse(error))
    }

}

export const addMemberToWorkSpaceController = async (req, res) => {
    try {
        const response = await addMemberToWorkSpaceService(
            req.params.workSpaceId,
            req.body.memberId,
            req.body.role || 'member',
            req.user
        )

        return res.status(StatusCodes.OK).json(successResponse(response, 'member added to the workspace successfully'));
    } catch (error) {
        console.log('add member to workspace controller error', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(customErrorResponse(error))
    }
}

export const addChannelToWorkSpaceController = async (req, res) => {
    try {
        const response = await addChannelToWorkSpaceService(
            req.params.workSpaceId,
            req.body.channelName,
            req.user
        )

        return res.status(StatusCodes.OK).json(successResponse(response, 'Channel added to the workspace successfully'));
    } catch (error) {
        console.log('add Channel to workspace controller error', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(customErrorResponse(error))
    }
}