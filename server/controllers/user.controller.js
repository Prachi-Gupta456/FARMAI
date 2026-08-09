
import {
    fetchUserService, getFarmInsightsService, reportIssueService, saveUserService,
    sendFeedbackService, sendQueryService, updateUserService
} from "../services/user.services.js";

export const saveUser = async (req, resp, next) => {

    try {
        const clerkId = req.clerkId

        const user = await saveUserService(clerkId, req.body)
        resp.send({
            success: true,
            user
        })

    } catch (error) {
        next(error)
    }

}

export const fetchUser = async (req, resp, next) => {

    try {
        const clerkId = req.clerkId

        const user = await fetchUserService(clerkId)
        resp.send({
            success: true,
            user
        })

    } catch (error) {
        next(error)
    }

}

export const updateUser = async (req, resp, next) => {

    try {
        const clerkId = req.clerkId
        const file = req.file


        const user = await updateUserService(clerkId, file, req.body)
        resp.send({
            success: true,
            user
        })

    } catch (error) {
        next(error)
    }

}

export const sendQuery = async (req, resp, next) => {

    try {

        await sendQueryService(req.body)
        resp.send({
            success: true,
            msg: "Thanks for contacting FarmAI! Our team has received your message and will respond soon."
        })

    } catch (error) {
        next(error)
    }

}

export const reportIssue = async (req, resp, next) => {

    try {

        await reportIssueService(req.file, req.body)
        resp.send({
            success: true,
            msg: "Your issue has been reported successfully. Our team will review it soon."
        })

    } catch (error) {
        next(error)
    }

}

export const sendFeedback = async (req, resp, next) => {

    try {

        await sendFeedbackService(req.body)

        resp.send({
            success: true,
            msg: "Thank you for yor feedback!"
        })

    } catch (error) {
        next(error)
    }

}

export const getFarmInsights = async (req, resp, next) => {

    try {
        const clerkId = req.clerkId

        const data = await getFarmInsightsService(clerkId)
        resp.send({
            success: true,
            data
        })

    } catch (error) {
        next(error)
    }

}
