import mongoose from "mongoose";
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/api.error.js";
import uploadOnCloudinary from "../utils/uploadFile.js";
import { callAgent } from "./agent.service.js";

export const sendMessageService = async (
    clerkId, chatId, query, crops, season, file
) => {

    const user = await User.findOne({ clerkId });
    if (!user) throw new ApiError(404, "User not found");

    let imageUrl = null;
    if (file) {
        imageUrl = await uploadOnCloudinary(file);
    }

    let chat;
    let isNewChat = false;

    if (chatId) {
        chat = await Chat.findOne({ _id: chatId, userId: user._id });
        if (!chat) throw new ApiError(404, "Chat not found");
    } else {
        chat = await Chat.create({
            userId: user._id,
            title: query.slice(0, 60),
            messages: [],
        });
        isNewChat = true;
    }

    // ==========================
    // Call FastAPI — always with chat._id as threadId
    // ==========================
    let agentResponse;
    try {
        agentResponse = await callAgent({
            threadId: chat._id.toString(),
            query,
            language: user?.language,
            crops,
            previousCrops: user?.myFarm?.previousCrops,
            state: user?.state,
            district: user?.district,
            soilType: user?.myFarm?.soilType,
            season,
            waterSources: user?.myFarm?.waterSources,
            farmSize: user?.myFarm?.farmSize,
            lat: user?.lat,
            lng: user?.lng,
            file,
        });
    } catch (err) {
        // agent fail ho gaya — kuch bhi save nahi karna
        console.error("Agent call failed:", err);

        // agar chat naya banaya tha (isliye empty hai), usse delete kar do
        if (isNewChat) {
            await Chat.deleteOne({ _id: chat._id });
        }

        throw new ApiError(502, "AI agent failed to respond. Please try again.");
    }

    if (!agentResponse || !agentResponse.result) {
        // agent ne response to diya lekin usable data nahi tha
        if (isNewChat) {
            await Chat.deleteOne({ _id: chat._id });
        }

        throw new ApiError(502, "AI agent did not return a valid response.");
    }

    const { selected_agent, result } = agentResponse;
    const missingFields = result?.missing_fields || [];

    // ==========================
    // Ab hi save karo — sirf tabhi jab agent ka response mil chuka ho
    // ==========================
    chat.messages.push({
        role: "user",
        agentType: selected_agent,
        message: query,
        imageUrl: imageUrl || null,
    });

    chat.messages.push({
        role: "assistant",
        agentType: selected_agent,
        message: result,
    });

    await chat.save();

    return {
        completed: true,
        chatId: chat._id,
        selectedAgent: selected_agent,
        missingFields,
        result,
        imageUrl
    }
}

export const fetchAllMessagesService = async (clerkId, chatId) => {

    const user = await User.findOne({ clerkId });
    if (!user) throw new ApiError(404, "User not found");

    const chat = await Chat.findOne({ _id: chatId, userId: user._id });
    if (!chat) throw new ApiError(404, "Chat not found or not yours");

    return {
        chatId: chat._id,
        title: chat.title,
        messages: chat.messages,
    };
}

export const fetchAllChatsService = async (clerkId) => {

    const user = await User.findOne({ clerkId });
    if (!user) throw new ApiError(404, "User not found");

    const chats = await Chat.find({ userId: user._id }).sort({ createdAt: -1 });
    return chats;
}

export const deleteChatService = async (clerkId, chatId) => {

    const user = await User.findOne({ clerkId });
    if (!user) throw new ApiError(404, "User not found");

    const res = await Chat.findOneAndDelete({ _id: chatId, userId: user._id })
    
}

