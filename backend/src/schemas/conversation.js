import mongoose, { model, Schema } from "mongoose";

const conversationSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ]
}, { timestamps: true });


const Conversation = model('Conversation', conversationSchema);

export default Conversation;