import Dm from "../schemas/dm.js";
import crudRepository from "./crudRepository.js";

const dmRepository =  {
    ...crudRepository(Dm),
    getPaginatedDm: async function (messageParams, page, limit){
            const message = await Dm.find(messageParams)
            .sort({createdAt: -1})
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('senderId', 'username email avatar')
            .populate('recieverId', 'username email avatar')
    
            return message;
        }
}

export default dmRepository;