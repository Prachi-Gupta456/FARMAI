"use client"

import { getSpeechLang } from "@/app/lib/getLocaleCookie"
import {
  Bug,
  ShieldCheck,
  TriangleAlert,
  CircleHelp,
  Volume2,
  Heart,
} from "lucide-react"

export default function PestBubble({
  message
}) {

  if (!message) return null

  const result = message.data || {}

  const {
    pest,
    recommendation,
    prevention = [],
    precautions = [],
    missing_fields = [],
  } = result

  const handleListen = () => {
  if (!window.speechSynthesis) {
    alert("Something went wrong...")
    return
  }

  let textToSpeak = ""

  if (pest) {
    textToSpeak += `Detected pest: ${pest}. `
  }

  if (recommendation) {
    textToSpeak += `Recommendation: ${recommendation}. `
  }

  if (prevention.length > 0) {
    textToSpeak += `Prevention tips: ${prevention.join(". ")}. `
  }

  if (precautions.length > 0) {
    textToSpeak += `Precautions: ${precautions.join(". ")}. `
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

      <div className="size-10 shrink-0 rounded-2xl bg-[#FFF4EC] flex items-center justify-center">
        <Bug className="size-5 text-[#F97316]" />
      </div>

      <div className="max-w-[85%]">

        <div className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-sm">

          {/* Accent */}

          <div className="h-1 bg-[#F97316]" />

          <div className="p-5">

            {/* Header */}

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-3">

                <div className="size-12 rounded-2xl bg-orange-50 flex items-center justify-center">
                  <Bug className="size-6 text-[#F97316]" />
                </div>

                <div>

                  <h3 className="font-semibold text-zinc-900">
                    Pest Detection
                  </h3>

                  <p className="text-xs text-zinc-500">
                    AI Pest Assistant
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-2">

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

            {/* Pest */}

            {pest && (

              <div className="mt-5 rounded-2xl border border-orange-100 bg-orange-50 p-4">

                <p className="text-xs uppercase tracking-wide font-semibold text-orange-600">
                  Detected Pest
                </p>

                <p className="mt-1 text-lg font-semibold text-zinc-900">
                  {pest}
                </p>

              </div>

            )}

            {/* Recommendation */}

            {recommendation && (

              <div className="mt-5 rounded-2xl border border-green-100 bg-green-50 p-4">

                <div className="flex gap-3">

                  <div className="size-10 rounded-xl bg-white flex items-center justify-center shrink-0">

                    <ShieldCheck className="size-5 text-[#00c950]" />

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

            {/* Prevention */}

            {prevention.length > 0 && (

              <div className="mt-6">

                <p className="font-semibold text-zinc-900 mb-3">
                  Prevention Tips
                </p>

                <div className="space-y-2">

                  {prevention.map((tip, index) => (

                    <div
                      key={index}
                      className="flex gap-3 rounded-xl border border-zinc-200 p-3"
                    >

                      <ShieldCheck className="size-4 mt-0.5 shrink-0 text-[#00c950]" />

                      <p className="text-sm leading-6 text-zinc-700">
                        {tip}
                      </p>

                    </div>

                  ))}

                </div>

              </div>

            )}

            {/* Precautions */}

            {precautions.length > 0 && (

              <div className="mt-6">

                <p className="font-semibold text-zinc-900 mb-3">
                  Precautions
                </p>

                <div className="space-y-2">

                  {precautions.map((item, index) => (

                    <div
                      key={index}
                      className="flex gap-3 rounded-xl border border-orange-100 bg-orange-50 p-3"
                    >

                      <TriangleAlert className="size-4 mt-0.5 shrink-0 text-orange-500" />

                      <p className="text-sm leading-6 text-zinc-700">
                        {item}
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
                      Please provide:
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">

                      {missing_fields.map((field) => (

                        <button
                          key={field}
                          className="rounded-full border border-orange-200 bg-white px-3 py-1.5 text-xs font-medium text-orange-600 hover:bg-orange-50 transition"
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