import Channel from "../schemas/channel.js";
import crudRepository from "./crudRepository.js";


const channelRepository = {
    ...crudRepository(Channel),

    getChannelWithWorkSpaceDetails: async function(channelId) {
        const channel = await Channel.findById(channelId).populate('workSpaceId');
        return channel;
    }
}


export default channelRepository;