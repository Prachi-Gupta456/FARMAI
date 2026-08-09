import express, { urlencoded } from "express"
import errorMiddleware from "./middlewares/error.middleware.js"
import cors from "cors"
import userRoutes from "./routes/user.routes.js"
import { clerkMiddleware } from "@clerk/express"
import chatRoutes from "./routes/chat.routes.js"

const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
app.use(express.json())
app.use(urlencoded({ extended: true }))

// Clerk Middleware
app.use(clerkMiddleware())

app.get("/", (req, resp) => resp.send("Backend is running..."))

app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes)

// Error Middleware
app.use(errorMiddleware)

export default app;