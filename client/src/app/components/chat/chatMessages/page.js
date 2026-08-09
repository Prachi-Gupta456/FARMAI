"use client"
import ChatBubble from "../chatBubble/page"
import TypingIndicator from "../typingIndicator/page"

export default function ChatMessages({ messages,isTyping }) {

    if (messages.length === 0) return null

    return (
        <div className="flex flex-col gap-5 px-4 py-5 pb-32">
            {messages.map((message) => (
                <ChatBubble key={message.id} message={message}/>
            ))}
            {isTyping && <TypingIndicator/>}
        </div>
    )
}
