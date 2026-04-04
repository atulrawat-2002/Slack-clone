import uuid4 from "uuid4";
import Conversation from "../schemas/conversation.js";

export const dmSocketHandler = async (io, socket) => {

    socket.on("createConversation", async function createConversationHandler(data, cb) {
        const { senderId, recieverId } = data;
        let roomId = null;
        let conversation = await Conversation.findOne({
                                        participants: { $all: [senderId, recieverId] }
                                    });
        if(conversation) {
            roomId = conversation.id;
            await socket.join(roomId);
            const sockets = await io.in(roomId).fetchSockets();
            console.log("conversation found and socket joined to this roomid", conversation.id);
            console.log("Sockets in room:", sockets.map(s => s.id));
            cb?.(conversation);
        }else {
            roomId = uuid4();
            console.log('creating conversation and socket joined to this room id', roomId);
            conversation = await Conversation.create({
                id: roomId,
                participants: [
                    senderId,
                    recieverId
                ]
            });
            await socket.join(roomId);
            const sockets = await io.in(roomId).fetchSockets();
            console.log("Sockets in room:", sockets.map(s => s.id));
            console.log(conversation)
            cb?.(conversation);
        }

    })  

    socket.on("sendDm", async function getNewDmHandler(data, cb) {

        console.log("new dm recieved",data);
        const { conversationId } = data;

        const sockets = await io.in(conversationId).fetchSockets();
        console.log("Sockets in room:", sockets.map(s => s.id));

        io.to(conversationId).emit("newDm", data);  

        cb?.({
            success: true,
            message: 'Successfully received DM'
        })

    })

}