import uuid4 from "uuid4"
import workSpaceRepository from "../repositories/workSpaceRepository.js";
import channelRepository from "../repositories/channleRepository.js";
import userRepository from "../repositories/userRepository.js";
import { addMailToMailQueue } from "../producers/mailQueueProducer.js";
import workSpaceJoinMale from "../utils/mailObject.js";


export function isUserAdminOfWorkSpace(workSpace, userId) {
    const isAllowed = workSpace.members.find((member) => {
      console.log("member id", member.memberId.toString(), "userid is ", userId)
      return (member.memberId.toString() === userId && member.role === 'admin')
    });

    return isAllowed;
}

export function isUserMemberOfWorkSpace( workSpace, userId) {
   const isMember = workSpace.members.find((member) => {
      return (member.memberId.toString() === userId || member.memberId._id.toString() === userId)
    });

    return isMember;
}

async function isChannelAlreadyPartOfWorkSpace(workSpace, channelName) {
   console.log(workSpace.channels)
   const isPart = workSpace.channels.find((channel) => channel?.name?.toLowerCase() === channelName.toLowerCase());
   return isPart;
}

export const createWorkSpaceService = async (workSpaceData) => {
    try {
      const joinCode = uuid4().substring(0, 6).toUpperCase();

    const response = await workSpaceRepository.create({ 
        name: workSpaceData.name,
        description: workSpaceData.description,
        joinCode
     });

     await workSpaceRepository.addMemberToWorkSpace(
        response._id,
        workSpaceData.owner,
        'admin'
     )

     const updatedWorkSpace = await workSpaceRepository.addChannelToWorkSpace(
        response._id,
        'general'
     )

     return updatedWorkSpace;
    } catch (error) {
      console.log('Error in create space service', error.message);
      throw new Error(error);
   }

}

export const getAllWorkSpaceUserIsMemberOfService = async (userId) => {
   try {
      const response = await workSpaceRepository.fetchAllWorkSpaceByMemberId(userId);
      return response;
   } catch (error) {
      console.log('Error in isUserMemberOfWorkSpace service', error.message);
      throw error;
   }
}

export const deleteWorkSpaceService = async (workSpaceId, userId) => {

   try {
      const workSpace = await workSpaceRepository.getById(workSpaceId);
      const isAllowed = isUserAdminOfWorkSpace(workSpace, userId)

   if(isAllowed) {
      await channelRepository.deleteMany(workSpace.channels);

      const response = await workSpaceRepository.delete(workSpaceId);
      return response;
   } 

   else if (!isAllowed) {
      throw new Error("User not allowed to delete work space");
   }

   } catch (error) {
         console.log('delete workspace service error', error.message);
         throw error;
   }

}

export const getWorkSpaceService = async (workSpaceId, userId) => {

   try {

      const workSpace = await workSpaceRepository.getWorkspaceDetailsById(workSpaceId);
      if(!workSpace) {
         throw new Error('No work space found');

      }

      if(!isUserMemberOfWorkSpace(workSpace, userId)) {
      throw new Error('User is not part of work Space');

      }

      return workSpace;

   } catch (error) {
      console.log('Error in get work space service', error.message);
      throw new Error(error);
   }
}

export const getWorkSpaceByJoinCodeService = async (joinCode, userId) => {
   try {
      const workSpace = await workSpaceRepository.getWorkSpaceByJoinCode(joinCode);

      if(!workSpace) {
      throw new Error('NO work space found');
      }

      const isMember = isUserMemberOfWorkSpace(workSpace, userId);

      if(!isMember) {
         throw new Error('User is not member of specified workspace')
      }

      return workSpace;
   } catch (error) {
      console.log('Error in get workspace by join code serviece', error.message) 
      throw new Error(error) 
   }
}

export const updatedWorkSpaceService = async (workSpaceId, workSpaceData, userId) => {
   try {
      const workSpace = await workSpaceRepository.getById(workSpaceId);

   if(!workSpace) {
      throw new Error('No work space found');
   }

   const isAdmin = isUserAdminOfWorkSpace(workSpace, userId);

   if(!isAdmin) {
      throw new Error('User is not admin to update the workspace')
   }

   const updatedWorkSpace = await workSpaceRepository.update(workSpaceId , workSpaceData);
   return updatedWorkSpace;
   } catch (error) {
      console.log('Error in update work space service', error.message);
      throw new Error(error)
   }
}

export const resetWorkspaceJoinCodeService = async (workspaceId, userId) => {
   try {

      const newJoinCode = uuid4().substring(0, 6).toUpperCase();
      const updatedWorkSpace = await updatedWorkSpaceService(workspaceId, { joinCode: newJoinCode } , userId);
      return updatedWorkSpace;

   } catch (error) {
      console.log('Error in reset workspace join code serviece', error.message) 
      throw new Error(error) 
   }
}  

export const addMemberToWorkSpaceService = async (workSpaceId, memberId, role, userId) => {
   try {
      const workSpace = await workSpaceRepository.getById(workSpaceId);

      const isAdmin = isUserAdminOfWorkSpace(workSpace, userId);

      if(!isAdmin) {
         throw new Error('User is not admin of the work space')
      }

      if(!workSpace) {
         throw new Error('No workspace found');
      }

      const isValidUser = await userRepository.getById(memberId);

      if(!isValidUser) {
         throw new Error('User is not valid')
      }

      const isMember = isUserMemberOfWorkSpace(workSpace, memberId);

      if(isMember) {
         throw new Error('User already member of the workspace');
      }

      const response = await workSpaceRepository.addMemberToWorkSpace(workSpaceId, memberId, role);

      await addMailToMailQueue({
         ...workSpaceJoinMale(workSpace),
         to: isValidUser.email,
      })

      return response;

   } catch (error) {
       console.log('Error in add member in workspace service', error.message);
       throw new Error(error)
   }
}

export const addChannelToWorkSpaceService = async (workSpaceId, channelName, userId) => {
   try {
      const workSpace = await workSpaceRepository.getById(workSpaceId);

      if(!workSpace) {
         throw new Error('No workspace found');
      }

      const iaAlreadyPresent = await isChannelAlreadyPartOfWorkSpace(workSpace, channelName);

      if(iaAlreadyPresent) {
         throw new Error('channel already present')
      }

      const isAdmin = isUserAdminOfWorkSpace(workSpace, userId);

      if(!isAdmin) {
         throw new Error('User is not admin');
      }

      const response = await workSpaceRepository.addChannelToWorkSpace(workSpace, channelName);
      return response;

   } catch (error) {
       console.log('Error in add channel in workspace service', error.message);
       throw new Error(error);
   }
}

export const joinWorkspaceService = async (workspaceId, joinCode, userId ) => {
   try {

      const workSpace = await workSpaceRepository.getWorkspaceDetailsById(workspaceId);

      if(!workSpace) {
         throw new Error('No workspace found');
      }

      if(workSpace.joinCode !== joinCode) {
         throw new Error('Invalid Join code');
      }

      const isAlreadMember = isUserMemberOfWorkSpace(workSpace, userId);

      if(isAlreadMember) {
         throw new Error('User Already part of workspace');
      }

      const updatedWorkSpace = await workSpaceRepository.addMemberToWorkSpace(workspaceId, userId, 'member');

      return updatedWorkSpace;

   } catch (error) {
       console.log('Error in Join workspace service', error.message);
       throw new Error(error);
   }
}

export const getAllExistingWorkspaces = async () => {
   try {
      
      const workspaces = await workSpaceRepository.getAll();
      return workspaces;

   } catch (error) {
      console.log('Error in get all existing workspace service', error.message)
   }
}