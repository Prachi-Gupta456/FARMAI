"use client"

import { getSpeechLang } from "@/app/lib/getLocaleCookie"
import {
  CloudSun,
  TriangleAlert,
  Sprout,
  CircleHelp,
  Volume2,
  Heart,
} from "lucide-react"

export default function WeatherBubble({
  message
}) {
  if (!message) return null

  const result = message.data || {}

  const {
    summary,
    recommendation,
    risks = [],
    missing_fields = [],
  } = result

  const handleListen = () => {
    if (!window.speechSynthesis) {
      alert("Something went wrong...")
      return
    }

    let textToSpeak = ""

    if (summary) {
      textToSpeak += `${summary}. `
    }

    if (recommendation) {
      textToSpeak += `Recommendation: ${recommendation}. `
    }

    if (risks.length > 0) {
      textToSpeak += `Possible risks: ${risks.join(". ")}. `
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

      {/* AI Avatar */}

      <div className="size-10 shrink-0 rounded-2xl bg-[#EAFBF1] flex items-center justify-center">
        <CloudSun className="size-5 text-[#00c950]" />
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
                  <CloudSun className="size-6 text-[#00c950]" />
                </div>

                <div>
                  <h3 className="font-semibold text-zinc-900">
                    Weather Update
                  </h3>

                  <p className="text-xs text-zinc-500">
                    AI Weather Assistant
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-2">

                {/* Listen */}

                <button
                  onClick={handleListen}
                  className="size-9 rounded-xl border border-zinc-200
                   flex items-center justify-center 
                    transition bg-green-500"
                >
                  <Volume2 className="size-4 text-white" />
                </button>

                {/* Favourite */}

                <button

                  className="size-9 rounded-xl border border-zinc-200 flex
                   items-center justify-center hover:bg-zinc-50 transition
                   bg-white"
                >
                  <Heart className="size-4 text-red-600" />
                </button>

              </div>

            </div>

            {/* Summary */}

            {summary && (
              <p className="mt-5 text-[15px] leading-7 text-zinc-700">
                {summary}
              </p>
            )}

            {/* Recommendation */}

            {recommendation && (
              <div className="mt-5 rounded-2xl border border-green-100 bg-green-50 p-4">

                <div className="flex gap-3">

                  <div className="size-10 rounded-xl bg-white flex items-center justify-center shrink-0">
                    <Sprout className="size-5 text-[#00c950]" />
                  </div>

                  <div>

                    <p className="font-semibold text-green-900">
                      Recommendation
                    </p>

                    <p className="mt-1 text-sm leading-6 text-green-800">
                      {recommendation}
                    </p>

                  </div>

                </div>

              </div>
            )}

            {/* Risks */}

            {risks.length > 0 && (

              <div className="mt-6">

                <p className="text-sm font-semibold text-zinc-900 mb-3">
                  Possible Risks
                </p>

                <div className="space-y-2">

                  {risks.map((risk, index) => (

                    <div
                      key={index}
                      className="flex gap-3 rounded-xl border border-zinc-200 p-3"
                    >

                      <TriangleAlert className="size-4 mt-0.5 shrink-0 text-orange-500" />

                      <p className="text-sm text-zinc-700 leading-6">
                        {risk}
                      </p>

                    </div>

                  ))}

                </div>

              </div>

            )}

            {/* Missing Fields */}

            {missing_fields.length > 0 && (

              <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">

                <div className="flex gap-3">

                  <CircleHelp className="size-5 mt-0.5 shrink-0 text-zinc-500" />

                  <div className="flex-1">

                    <p className="font-semibold text-zinc-900">
                      Help me improve my advice
                    </p>

                    <p className="mt-1 text-sm text-zinc-600">
                      Please provide the following information:
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">

                      {missing_fields.map((field) => (

                        <button
                          key={field}
                          className="rounded-full border border-[#00c950]/20 bg-white px-3 py-1.5 text-xs font-medium text-[#00c950] hover:bg-[#F3FCF6] transition"
                        >
                          {field}
                        </button>

                      ))}

                    </div>

                  </div>

                </div>

              </div>

            )}

          </div>

        </div>

        <p className="mt-2 ml-2 text-[10px] text-zinc-400">
          {message.time}
        </p>

      </div>

    </div>
  )
}