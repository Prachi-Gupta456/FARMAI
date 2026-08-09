
"use client"

import AiBubble from "./aiBubble/page"
import UserBubble from "./userBubble/page"

export default function ChatBubble({ message, accent="from-sky-400 to-blue-600"}) {
    if (!message) return null

    const isUser = message?.type === "user"

    return isUser
        ? <UserBubble message={message} />
        : <AiBubble message={message} accent={accent} />
}