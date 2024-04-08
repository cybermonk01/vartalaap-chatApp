import mongoose, { Schema } from "mongoose";

const ConversationSchema = new Schema(
  {
    members: {
      type: Array,
    },
  },

  {
    timestamps: true,
  }
);

export const Conversation = mongoose.model("Conversation", ConversationSchema);
