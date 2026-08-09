import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },

    agentType: {
      type: String,
      enum: [
        "weather",
        "crop_recommendation",
        "market",
        "pest",
        "scheme",
        "fertilizer",
        "irrigation",
        "disease",
        "fallback"
      ],
      required: true,
    },
    imageUrl:String,

    message: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
    _id: false,
  }
);

const chatSchema = new mongoose.Schema({
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },

  title: {
    type: String,
    default: "New Chat",
  },

  messages: {
    type: [messageSchema],
    default: [],
  }
}, { timestamps: true });

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);
export default Chat;