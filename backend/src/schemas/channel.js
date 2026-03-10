import mongoose from 'mongoose';

const channelScheman = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Channel name is required']
    }
  },
  { timestamps: true }
);

const Channel = mongoose.model('channel', channelScheman);

export default Channel;
