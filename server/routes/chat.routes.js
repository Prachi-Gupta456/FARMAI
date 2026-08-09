import express from "express"
import protect from "../middlewares/auth.middleware.js";
import { deleteChat, fetchAllChats, fetchAllMessage, sendMessage } from "../controllers/chat.controller.js";
import upload from "../middlewares/multer.middleware.js";

const chatRouter = express.Router()

chatRouter.post("/send",upload.single("leaf-image"),protect,sendMessage)
chatRouter.get("/fetch/:chatId",protect,fetchAllMessage)
chatRouter.get("/fetch-chats",protect,fetchAllChats)
chatRouter.delete("/delete/:chatId",protect,deleteChat)

export default chatRouter;

