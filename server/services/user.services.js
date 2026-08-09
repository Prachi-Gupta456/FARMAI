import uploadOnCloudinary from "../utils/uploadFile.js"
import User from "../models/user.model.js"
import ApiError from "../utils/api.error.js"
import { clerkClient } from "@clerk/express";
import { contactUsMailSender, reportIssueMailSender } from "../utils/mailSender.js";
import Feedback from "../models/feedback.model.js";
import { callFarmInsightsAgent } from "./agent.service.js";
import { redisClient } from "../config/redis.js";

export const fetchUserService = async (clerkId) => {

    const redisUser = await redisClient.get(`user:${clerkId}`)

    if (redisUser) return JSON.parse(redisUser);

    const user = await User.findOne({ clerkId })

    if (user) {
        // save in cache
        await redisClient.set(`user:${clerkId}`, JSON.stringify(user), "EX", 3600)

        return user;
    }

    throw new ApiError(404, "User not found", true)

}

export const saveUserService = async (clerkId, data) => {

    const cachedUser = await redisClient.get(`user:${clerkId}`)
    if (cachedUser) return JSON.parse(cachedUser);

    const existingUser = await User.findOne({ clerkId })
    if (existingUser) {
        await redisClient.set(`user:${clerkId}`, JSON.stringify(existingUser), "EX", 3600)
        return existingUser;
    }

    const { lat, lng, state, district, language } = data
    const clerkUser = await clerkClient.users.getUser(clerkId)

    const email = clerkUser.emailAddresses.find(
        (e) => e.id === clerkUser.primaryEmailAddressId
    )?.emailAddress

    if (!email) {
        throw new ApiError(400, "Clerk user has no primary email address");
    }

    // save user 
    const newUser = await User.create({
        clerkId,
        email,
        lat,
        lng,
        state,
        district,
        language
    })

    // save in cache
    await redisClient.set(`user:${clerkId}`, JSON.stringify(newUser), "EX", 3600)

    return newUser
}

export const updateUserService = async (clerkId, file, data) => {

    const user = await User.findOne({ clerkId })

    if (!user) {
        throw new ApiError(404, "User not found", true)
    }

    const { name, language, state, district, soilType, waterSources, farmSize, previousCrops, lat, lng } = data

    const parsedWaterSources = waterSources ? JSON.parse(waterSources) : undefined
    const parsedPreviousCrops = previousCrops ? JSON.parse(previousCrops) : undefined


    const updateFields = {
        name: name ?? user.name,
        language: language || user.language,
        state: state || user.state,
        district: district || user.district,
        lat: lat ?? user.lat,
        lng: lng ?? user.lng,
        "myFarm.soilType": soilType || user.myFarm?.soilType,
        "myFarm.waterSources": parsedWaterSources ?? user.myFarm?.waterSources,
        "myFarm.farmSize": farmSize !== undefined && farmSize !== "" ? Number(farmSize) : user.myFarm?.farmSize,
        "myFarm.previousCrops": parsedPreviousCrops ?? user.myFarm?.previousCrops
    };

    if (file) {
        updateFields.image = await uploadOnCloudinary(file);
    }

    const updatedUser = await User.findOneAndUpdate(
        { clerkId },
        { $set: updateFields },
        { new: true, runValidators: true }
    );

    // save in cache
    await redisClient.set(`user:${clerkId}`, JSON.stringify(updatedUser), "EX", 3600)

    return updatedUser

}

export const sendQueryService = async (data) => {

    const { name, email, subject, msg } = data

    if (!name || !email || !subject || !msg) {
        throw new ApiError(400, "Please provide sufficient details.", true)
    }

    await contactUsMailSender(data)

}

export const reportIssueService = async (file, data) => {

    const { name, email, issueType, description, device, browser } = data

    if (!name || !email || !issueType || !description || !device || !browser) {
        throw new ApiError(400, "Please provide sufficient details.", true)
    }

    await reportIssueMailSender(data, file)

}

export const sendFeedbackService = async (data) => {
    const { liked, improve, feature, rating } = data;

    if (!rating) {
        throw new ApiError(400, "Please provide a rating", true)
    }

    if (
        !liked.trim() &&
        !improve.trim() &&
        !feature.trim()
    ) {
        throw new ApiError(400, "Please share at least one feedback or suggestion.", true)
    }

    // Save feedback to database
    const res = await Feedback.create(data)

}

export const getFarmInsightsService = async (clerkId) => {

    const user = await User.findOne({ clerkId })
    if (!user) {
        throw new ApiError(404, "User not found", true)
    }

    const cacheKey = `farmInsights:${clerkId}`;
    const cachedFarmInsights = await redisClient.get(cacheKey)

    if (cachedFarmInsights) return JSON.parse(cachedFarmInsights);

    const data = {
        lat: user.lat,
        lng: user.lng,
        language: user.language
    }

    const result = await callFarmInsightsAgent(data)

    // save in cache — refreshes once a day
    await redisClient.setEx(cacheKey, 24 * 60 * 60, JSON.stringify(result))

    return result;
}