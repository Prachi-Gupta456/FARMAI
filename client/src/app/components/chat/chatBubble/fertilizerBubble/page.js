"use client"

import { getSpeechLang } from "@/app/lib/getLocaleCookie"
import {
  FlaskConical,
  Package,
  Ruler,
  ShieldCheck,
  TriangleAlert,
  CircleHelp,
  Volume2,
  Heart,
} from "lucide-react"

export default function FertilizerBubble({
  message
}) {

  if (!message) return null

  const result = message.data || {}

  const {
    recommendation,
    fertilizer,
    quantity,
    reason,
    application_method,
    precautions = [],
    missing_fields = [],
  } = result

  const handleListen = () => {
    if (!window.speechSynthesis) {
      alert("Something went wrong...")
      return
    }

    let textToSpeak = ""

    if (recommendation) {
      textToSpeak += `Recommendation: ${recommendation}. `
    }

    if (fertilizer) {
      textToSpeak += `Fertilizer: ${fertilizer}. `
    }

    if (quantity) {
      textToSpeak += `Quantity: ${quantity}. `
    }

    if (reason) {
      textToSpeak += `Why this fertilizer: ${reason}. `
    }

    if (application_method) {
      textToSpeak += `Application method: ${application_method}. `
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

      <div className="size-10 shrink-0 rounded-2xl bg-[#F3FCF6] flex items-center justify-center">
        <FlaskConical className="size-5 text-[#00c950]" />
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
                  <FlaskConical className="size-6 text-[#00c950]" />
                </div>

                <div>

                  <h3 className="font-semibold text-zinc-900">
                    Fertilizer Advice
                  </h3>

                  <p className="text-xs text-zinc-500">
                    AI Fertilizer Assistant
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

                  className="size-9 rounded-xl border border-zinc-200 bg-white flex items-center justify-center hover:bg-zinc-50 transition"
                >
                  <Heart className="size-4 text-red-600" />
                </button>

              </div>

            </div>

            {/* Recommendation */}

            {recommendation && (

              <div className="mt-5 rounded-2xl border border-green-100 bg-green-50 p-4">

                <div className="flex gap-3">

                  <div className="size-10 rounded-xl bg-white flex items-center justify-center">

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

            {/* Fertilizer + Quantity */}

            <div className="grid grid-cols-2 gap-3 mt-5">

              <div className="rounded-2xl border border-zinc-200 p-4">

                <Package className="size-5 text-[#00c950]" />

                <p className="mt-3 text-xs text-zinc-500">
                  Fertilizer
                </p>

                <p className="font-semibold text-zinc-900 mt-1">
                  {fertilizer}
                </p>

              </div>

              <div className="rounded-2xl border border-zinc-200 p-4">

                <Ruler className="size-5 text-[#00c950]" />

                <p className="mt-3 text-xs text-zinc-500">
                  Quantity
                </p>

                <p className="font-semibold text-zinc-900 mt-1">
                  {quantity}
                </p>

              </div>

            </div>

            {/* Why */}

            {reason && (

              <div className="mt-6">

                <p className="font-semibold text-zinc-900 mb-2">
                  Why this fertilizer?
                </p>

                <p className="text-sm leading-7 text-zinc-700">
                  {reason}
                </p>

              </div>

            )}

            {/* Application */}

            {application_method && (

              <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">

                <p className="font-semibold text-blue-900">
                  Application Method
                </p>

                <p className="mt-2 text-sm leading-6 text-blue-800">
                  {application_method}
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

            {/* Missing */}

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
                          className="rounded-full border border-green-200 bg-white px-3 py-1.5 text-xs font-medium text-[#00c950] hover:bg-[#F3FCF6] transition"
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