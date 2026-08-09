import { deleteChatService, fetchAllChatsService, fetchAllMessagesService, sendMessageService }
    from "../services/chat.services.js";

export const sendMessage = async (req, resp, next) => {

    try {
        const clerkId = req.clerkId
        const file = req.file

        const { chatId, query, crops, season } = req.body
        const parsed_crops = JSON.parse(crops)

        const data = await sendMessageService(clerkId, chatId, query, parsed_crops, season, file)

        resp.send({
            success: true,
            data
        })

    } catch (error) {
        next(error)
    }

}

export const fetchAllMessage = async (req, resp, next) => {

    try {
        const clerkId = req.clerkId
        const { chatId } = req.params

        const data = await fetchAllMessagesService(clerkId, chatId)

        resp.send({
            success: true,
            data
        })

    } catch (error) {
        next(error)
    }

}

export const fetchAllChats = async (req, resp, next) => {

    try {
        const clerkId = req.clerkId

        const chats = await fetchAllChatsService(clerkId)

        resp.send({
            success: true,
            chats
        })

    } catch (error) {
        next(error)
    }

}

export const deleteChat = async (req, resp, next) => {

    try {
        const clerkId = req.clerkId
        const { chatId } = req.params

        await deleteChatService(clerkId, chatId)

        resp.send({
            success: true,
            msg: "Chat deleted successfully."
        })

    } catch (error) {
        next(error)
    }

}
