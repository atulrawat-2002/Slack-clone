import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
    body: {
        type: String,
        required: [true, 'Meassage body is required']
    },
    image: {
        type: String,
    },
    channelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel',
        required: [true, 'Channel Id is required']
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Sender Id is required']
    },
    workSpaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WorkSpace", 
        required: [true, 'Workspace id is required']
    }
}, { timestamps: true });


const Message = mongoose.model('Message', messageSchema);

export default Message;