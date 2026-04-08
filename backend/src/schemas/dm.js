import mongoose, { model, Schema } from "mongoose";

const dmSchema = new Schema({
    conversationId: {
      type: String,
      ref: 'Conversation',
      required: true
    },
    body: {
        type: String,
        required: true,
        trim: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    image: {
        publicId: String,
        url: String
    },
    status: {
    type: String,
    enum: ["sent", "delivered", "seen"],
    default: "sent"
  },
  seenAt: {
    type: Date
  },
  deliveredAt: {
    type: Date
  }
}, { timestamps: true })


const Dm = model("Dm", dmSchema);

export default Dm;