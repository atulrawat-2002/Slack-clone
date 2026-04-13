import uuid4 from "uuid4";
import Conversation from "../schemas/conversation.js";
import { createDmService } from "../services/dmService.js"; // ✅ import service not repository

export const dmSocketHandler = async (io, socket) => {

    socket.on("createConversation", async function createConversationHandler(data, cb) {
        const { senderId, recieverId } = data;
        let roomId = null;
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recieverId] }
        });

        if (conversation) {
            roomId = conversation.id;
            await socket.join(roomId);
            cb?.(conversation);
        } else {
            roomId = uuid4();
            conversation = await Conversation.create({
                id: roomId,
                participants: [senderId, recieverId]
            });
            await socket.join(roomId);
            cb?.(conversation);
        }
    });

    socket.on("sendDm", async function getNewDmHandler(data, cb) {
        const { conversationId } = data;

        // ✅ Bug 1 fixed — was calling dmRepository.create directly
        const messageResponse = await createDmService(data);

        io.to(conversationId).emit("newDm", messageResponse);

        cb?.({
            success: true,
            message: 'Successfully received DM',
            response: messageResponse
        });
    });
};