import channelRepository from "../repositories/channleRepository.js";
import messsageRepository from "../repositories/messageRepository.js";
import { isUserMemberOfWorkSpace } from "./workSpaceService.js";

export const getChannelByIdService = async (channelId, userId) => {
    try {
        const channel = await channelRepository.getChannelWithWorkSpaceDetails(channelId);

        if(!channel || !channel?.workSpaceId) {
            throw new Error('No channel found')
        }
        const isUserPartOfWorkSpace = isUserMemberOfWorkSpace(channel.workSpaceId, userId);

        if(!isUserPartOfWorkSpace) {
            throw new Error('User is not part of workspace');
        }

        const messages = await messsageRepository.getPaginatedMessages({
            channelId
        }, 1, 20);

        return {
            messages,
            _id: channel._id,
            name: channel.name,
            createdAt: channel.createdAt,
            updatedAt: channel.updatedAt,
            workSpaceId: channel.workSpaceId
        }

    } catch (error) {
        console.log('Get channel by Id service error', error.message);
        throw new Error(error)
    }
}