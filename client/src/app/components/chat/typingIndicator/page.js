
import { Bot } from "lucide-react";

export default function TypingIndicator() {

    return (
        <div className="flex items-end gap-2">

            {/* AI Avatar */}

            <div
                className="size-9 rounded-2xl bg-gradient-to-br
                from-emerald-400 to-green-600 flex items-center
                    justify-center shadow-md shrink-0"
            >
                <Bot className="size-4 text-white" />

            </div>

            {/* Bubble */}

            <div
                className="rounded-3xl rounded-bl-md border border-zinc-200
                            bg-white px-5  py-4 shadow-sm">

                <div className="flex items-center gap-1.5">

                    <span className="size-2 rounded-full bg-zinc-400 animate-bounce"></span>

                    <span
                        className="size-2 rounded-full bg-zinc-400 animate-bounce"
                        style={{
                            animationDelay: "0.15s"
                        }}
                    ></span>

                    <span
                        className="size-2 rounded-full bg-zinc-400 animate-bounce"
                        style={{
                            animationDelay: "0.3s"
                        }}
                    ></span>

                </div>

            </div>

        </div>

    )
}