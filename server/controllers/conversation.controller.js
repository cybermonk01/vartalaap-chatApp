import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Conversation } from "../models/conversation.model.js";

export const sendConversation = asyncHandler(async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    return res
      .status(200)
      .json(
        new ApiResponse(200, { savedConversation }, "conversation users saved")
      );
  } catch (err) {
    throw new ApiError(
      500,
      err.message || "Something wrong in saving conversations"
    );
  }
});

export const getConversations = asyncHandler(async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });

    res
      .status(200)
      .json(
        new ApiResponse(200, { conversation }, "conversations fetched per user")
      );
  } catch (err) {
    throw new ApiError(
      500,
      err.message || "Something wrong in fetching conversations"
    );
  }
});
