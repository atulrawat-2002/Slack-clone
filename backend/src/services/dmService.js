import cloudinary from 'cloudinary'; // ✅ Bug 3 fixed — was missing entirely
import dmRepository from '../repositories/dmRepository.js';
import Conversation from '../schemas/conversation.js';

export const createDmService = async (dm) => {
  try {
    if (dm?.image) {
      const cloudImage = await cloudinary.uploader.upload(dm.image, { // ✅ Bug 2 fixed — was `message.image`
        folder: 'slack-chat-media'
      });

      dm = {
        ...dm, // ✅ Bug 2 fixed — was spreading `message`
        image: {
          publicId: cloudImage.public_id,
          url: cloudImage.url
        }
      };
    }

    const newDm = await dmRepository.create(dm);
    return newDm;
  } catch (error) {
    console.log('Error in create dm service', error.message);
  }
};

export const getPaginatedDmsService = async (messageParams, page, limit, user) => {
  try {
    const { conversationId } = messageParams;

    const conversation = await Conversation.findOne({ id: conversationId });

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    // ✅ Bug 4 fixed — handles both full user object and raw id
    const userId = user?._id ?? user;
    const isParticipant = conversation.participants.find(item => item.equals(userId));

    if (!isParticipant) {
      throw new Error('User is not part of the conversation');
    }

    const dms = await dmRepository.getPaginatedDm(messageParams, page, limit);
    return dms;

  } catch (error) {
    console.log('Error in getPaginated dms services', error.message);
  }
};