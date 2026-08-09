import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
{
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    liked: {
        type: String,
        default: "",
    },
    improve: {
        type: String,
        default: "",
    },
    feature: {
        type: String,
        default: "",
    },
},
{
    timestamps: true,
});

const Feedback = mongoose.models.Feedback || mongoose.model("Feedback",feedbackSchema)

export default Feedback;