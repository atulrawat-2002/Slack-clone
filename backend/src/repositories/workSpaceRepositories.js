import User from "../schemas/user.js";
import WorkSpace from "../schemas/workSpace.js"
import channelRepository from "./channleRepository.js";
import crudRepository from "./crudRepository.js"


const workSpaceRepositories = {
    ...crudRepository(WorkSpace),
    getWorkSpaceByName: async function(workSpaceName) {
        const workSpace = WorkSpace.findOne({
            name: workSpaceName
        });

        if (!workSpace) {
            throw new Error('Work space not found');
        }

        return workSpace;

    },
    getWorkSpaceByJoinCode: async function(joinCode) {
        const workSpace = WorkSpace.findOne({
            joinCode: joinCode
        });

        if (!workSpace) {
            throw new Error('Work space not found');
        }

        return workSpace;
    },
    addMemberToWorkSpace: async function (workSpaceId, memberId, role){
        const workSpace = await WorkSpace.findById(workSpaceId);

        if(!workSpace) {
            throw new Error('Work Space not found');
        }

        const isValidUser = await User.findById(memberId);

        if (!isValidUser) {
            throw new Error('No User found')
        }

        const memberAlreadyExist = workSpace.members.find(
            (member) => member.memberId === memberId
        );

        if(memberAlreadyExist) {
            throw new Error ('User alread present in the workspace');
        }

        workSpace.members.push({
            memberId,
            role
        })

        await workSpace.save();
    },
    addChannelToWorkSpace: async function(workSpaceId, channelName) {
        const workSpace = await WorkSpace.findById(workSpaceId).populate('channels');
        if(!workSpace) {
            throw new Error('Work space not found');
        }

        const isChannelAlreadyPresent = workSpace.channels.find(
            (channel) => channel.name === channelName
        )

        if(isChannelAlreadyPresent) {
            throw new Error('Channle already present in the work space');
        }

        const channel = await channelRepository.create({name: channelName});
        workSpace.channels.push(channel);
        await workSpace.save();

        return workSpace;

    },
    fetchAllWorkSpaceByMemberId: async function (memberId) {
        const workSpaces = await WorkSpace.find({
            'members.memberId': memberId
        }).populate('members.memberId', 'username, email, avatar')

        return workSpaces;
    }
}


export default workSpaceRepositories;