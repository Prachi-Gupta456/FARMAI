import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    language: {
        type: String,
        default: "English",
    },

    state: String,
    district: String,

    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },

    image: String,

    myFarm: {
        soilType: String,
        waterSources: [String],
        farmSize: Number,
        previousCrops: [String]
    }

}, { timestamps: true })

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;