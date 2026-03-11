import Channel from "../schemas/channel";
import crudRepository from "./crudRepository";


const channelRepository = {
    ...crudRepository(Channel),
}


export default channelRepository;