import mongoose, { model, Schema } from "mongoose";

const workSpaceSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Workspace name is required']
    },
    description: {
        type: String,
    },
    members: [
        {
            memberId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            role: {
                type: String,
                enum: ['admin', 'member'],
                default: 'member'
            }
        }
    ],
    joinCode: {
        type: String,
        required: [true, 'Join code is required']
    },
    channels: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Channel'
        }
    ]
})


const WorkSpace = model('WorkSpace', workSpaceSchema)

export default WorkSpace;