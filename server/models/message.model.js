import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

export const Message = mongoose.model("Message", MessageSchema);
