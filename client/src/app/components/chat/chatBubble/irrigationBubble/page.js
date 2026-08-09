"use client"

import { getSpeechLang } from "@/app/lib/getLocaleCookie"
import {
  Droplets,
  CircleHelp,
  ShieldCheck,
  TriangleAlert,
  Volume2,
  Heart,
  CheckCircle2,
  XCircle,
} from "lucide-react"

export default function IrrigationBubble({
  message
}) {

  if (!message) return null

  const result = message.data || {}

  const {
    recommendation,
    irrigate_today,
    reason,
    precautions = [],
    missing_fields = [],
  } = result

  const handleListen = () => {
  if (!window.speechSynthesis) {
    alert("Something went wrong...")
    return
  }

  let textToSpeak = ""

  textToSpeak += irrigate_today
    ? "Today's status: Irrigate today. "
    : "Today's status: No irrigation needed. "

  if (recommendation) {
    textToSpeak += `Recommendation: ${recommendation}. `
  }

  if (reason) {
    textToSpeak += `Why: ${reason}. `
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

      <div className="size-10 shrink-0 rounded-2xl bg-[#EEF7FF] flex items-center justify-center">
        <Droplets className="size-5 text-[#3B82F6]" />
      </div>

      <div className="max-w-[85%]">

        <div className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-sm">

          {/* Accent */}

          <div className="h-1 bg-[#3B82F6]" />

          <div className="p-5">

            {/* Header */}

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-3">

                <div className="size-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <Droplets className="size-6 text-[#3B82F6]" />
                </div>

                <div>

                  <h3 className="font-semibold text-zinc-900">
                    Irrigation Advice
                  </h3>

                  <p className="text-xs text-zinc-500">
                    AI Irrigation Assistant
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-2">

                {/* Listen */}

                <button
                 onClick={handleListen}
                  className="size-9 rounded-xl border border-zinc-200 bg-green-500 flex items-center justify-center transition hover:bg-green-600 active:scale-95"
                >
                  <Volume2 className="size-4 text-white" />
                </button>

                {/* Favourite */}

                <button
                 
                  className="size-9 rounded-xl border border-zinc-200 bg-white flex items-center justify-center hover:bg-zinc-50 transition active:scale-95"
                >
                  <Heart className="size-4 text-red-600" />
                </button>

              </div>

            </div>

            {/* Irrigation Status */}

            <div
              className={`mt-5 rounded-2xl border p-4 ${
                irrigate_today
                  ? "border-green-100 bg-green-50"
                  : "border-red-100 bg-red-50"
              }`}
            >

              <div className="flex items-center gap-3">

                <div
                  className={`size-11 rounded-xl flex items-center justify-center ${
                    irrigate_today ? "bg-white" : "bg-white"
                  }`}
                >
                  {irrigate_today ? (
                    <CheckCircle2 className="size-6 text-green-600" />
                  ) : (
                    <XCircle className="size-6 text-red-500" />
                  )}
                </div>

                <div>

                  <p className="text-xs uppercase tracking-wide font-semibold text-zinc-500">
                    Today's Status
                  </p>

                  <h3
                    className={`text-lg font-bold ${
                      irrigate_today
                        ? "text-green-700"
                        : "text-red-600"
                    }`}
                  >
                    {irrigate_today
                      ? "Irrigate Today"
                      : "No Irrigation Needed"}
                  </h3>

                </div>

              </div>

            </div>

            {/* Recommendation */}

            {recommendation && (

              <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">

                <div className="flex gap-3">

                  <div className="size-10 rounded-xl bg-white flex items-center justify-center shrink-0">

                    <ShieldCheck className="size-5 text-[#3B82F6]" />

                  </div>

                  <div>

                    <p className="font-semibold text-blue-900">
                      Recommendation
                    </p>

                    <p className="mt-1 text-sm leading-6 text-blue-800">
                      {recommendation}
                    </p>

                  </div>

                </div>

              </div>

            )}

            {/* Reason */}

            {reason && (

              <div className="mt-5">

                <p className="font-semibold text-zinc-900 mb-2">
                  Why?
                </p>

                <p className="text-sm leading-7 text-zinc-700">
                  {reason}
                </p>

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
                      className="flex gap-3 rounded-xl border border-zinc-200 p-3"
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
                          className="rounded-full border border-blue-200 bg-white px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 transition"
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