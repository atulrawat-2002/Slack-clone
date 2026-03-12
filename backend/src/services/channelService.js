import channelRepository from "../repositories/channleRepository.js";
import { isUserMemberOfWorkSpace } from "./workSpaceService.js";

export const getChannelByIdService = async (channelId, userId) => {
    try {
        const channel = await channelRepository.getChannelWithWorkSpaceDetails(channelId);

        if(!channel || !channel?.workSpaceId) {
            throw new Error('No channel found')
        }
        console.log(channel)
        const isUserPartOfWorkSpace = isUserMemberOfWorkSpace(channel.workSpaceId, userId);

        if(!isUserPartOfWorkSpace) {
            throw new Error('User is not part of workspace');
        }

        return channel;

    } catch (error) {
        console.log('Get channel by Id service error', error.message);
        throw new Error(error)
    }
}