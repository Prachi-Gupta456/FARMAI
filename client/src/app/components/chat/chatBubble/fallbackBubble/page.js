"use client"

import { getSpeechLang } from "@/app/lib/getLocaleCookie"
import {
  Sparkles,
  Bot,
  Volume2,
  Heart,
} from "lucide-react"

export default function FallbackBubble({
  message
}) {

  if (!message) return null

  const result = message.data || {}

  const { summary } = result

  const handleListen = () => {
    if (!window.speechSynthesis) {
      alert("Something went wrong...")
      return
    }

    let textToSpeak = ""

    if (summary) {
      textToSpeak += `${summary}. `
    }

    if (!textToSpeak) {
      textToSpeak = "No details available to read out."
    }

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(textToSpeak)
    utterance.lang = getSpeechLang()
    utterance.rate = 1
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="flex gap-3 items-end">

      {/* Avatar */}

      <div className="size-10 shrink-0 rounded-2xl bg-[#F5F5F5] flex items-center justify-center">
        <Bot className="size-5 text-[#00c950]" />
      </div>

      <div className="max-w-[85%]">

        <div className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-sm">

          {/* Accent */}

          <div className="h-1 bg-[#00c950]" />

          <div className="p-5">

            {/* Header */}

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-3">

                <div className="size-12 rounded-2xl bg-[#F3FCF6] flex items-center justify-center">
                  <Sparkles className="size-6 text-[#00c950]" />
                </div>

                <div>

                  <h3 className="font-semibold text-zinc-900">
                    Krishi Mitra AI
                  </h3>

                  <p className="text-xs text-zinc-500">
                    AI Assistant
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-2">

                {/* Listen */}

                <button
                  onClick={handleListen}
                  className="size-9 rounded-xl border border-zinc-200 bg-green-500 flex items-center justify-center hover:bg-green-600 transition"
                >
                  <Volume2 className="size-4 text-white" />
                </button>

                {/* Favourite */}

                <button
                  onClick={() => onFavourite(message)}
                  className="size-9 rounded-xl border border-zinc-200 bg-white flex items-center justify-center hover:bg-zinc-50 transition"
                >
                  <Heart className="size-4 text-red-600" />
                </button>

              </div>

            </div>

            {/* Response */}

            <div className="mt-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">

              <p className="text-sm leading-7 text-zinc-700">
                {summary}
              </p>

            </div>

          </div>

        </div>

        <p className="mt-2 ml-2 text-[10px] text-zinc-400">
          {message.time}
        </p>

      </div>

    </div>
  )
}