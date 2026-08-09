import express from "express"
import protect from "../middlewares/auth.middleware.js";
import {
    fetchUser, getFarmInsights, reportIssue,
    saveUser, sendFeedback, sendQuery, updateUser
} from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";

const userRouter = express.Router()

userRouter.get("/fetch", protect, fetchUser)
userRouter.post("/save", protect, saveUser)
userRouter.post("/update", protect, upload.single("image"), updateUser)
userRouter.post("/send-query", sendQuery)
userRouter.post("/report-issue", upload.single("image"), reportIssue)
userRouter.post("/feedback", sendFeedback)
userRouter.get("/farm/insights",protect, getFarmInsights)


export default userRouter;