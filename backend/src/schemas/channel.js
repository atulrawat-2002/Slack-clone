import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Channel name is required']
    },
    workSpaceId: {
      type: mongoose.Schema.ObjectId,
      ref: 'WorkSpace',
      required: [true, 'WorkSpace is required']
    }
  },
  { timestamps: true }
);

const Channel = mongoose.model('Channel', channelSchema);

export default Channel;
