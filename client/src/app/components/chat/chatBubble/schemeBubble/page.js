"use client"

import { getSpeechLang } from "@/app/lib/getLocaleCookie"
import {
  Landmark,
  BadgeCheck,
  FileText,
  CircleHelp,
  TriangleAlert,
  Volume2,
  Heart,
} from "lucide-react"

export default function SchemeBubble({
  message
}) {

  if (!message) return null

  const result = message.data || {}

  const {
    summary,
    matched_schemes = [],
    recommendation,
    reason,
    missing_fields = [],
  } = result

  const handleListen = () => {
    if (!window.speechSynthesis) {
      alert("Something went wrong...")
      return
    }

    let textToSpeak = ""

    if (summary) {
      textToSpeak += `Summary: ${summary}. `
    }

    if (recommendation) {
      textToSpeak += `Recommendation: ${recommendation}. `
    }

    if (matched_schemes.length > 0) {
      textToSpeak += `Eligible schemes: ${matched_schemes.join(". ")}. `
    }

    if (reason) {
      textToSpeak += `Why these schemes: ${reason}. `
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

      <div className="size-10 shrink-0 rounded-2xl bg-[#EEF6FF] flex items-center justify-center">
        <Landmark className="size-5 text-[#2563EB]" />
      </div>

      <div className="max-w-[85%]">

        <div className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-sm">

          <div className="h-1 bg-[#2563EB]" />

          <div className="p-5">

            {/* Header */}

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-3">

                <div className="size-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <Landmark className="size-6 text-[#2563EB]" />
                </div>

                <div>

                  <h3 className="font-semibold text-zinc-900">
                    Government Schemes
                  </h3>

                  <p className="text-xs text-zinc-500">
                    AI Scheme Assistant
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-2">

                <button
                  onClick={handleListen}
                  className="size-9 rounded-xl border border-zinc-200 bg-green-500 flex items-center justify-center hover:bg-green-600 transition"
                >
                  <Volume2 className="size-4 text-white" />
                </button>

                <button

                  className="size-9 rounded-xl border border-zinc-200 bg-white flex items-center justify-center hover:bg-zinc-50 transition"
                >
                  <Heart className="size-4 text-red-600" />
                </button>

              </div>

            </div>

            {/* Summary */}

            {summary && (

              <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">

                <p className="font-semibold text-blue-900">
                  Summary
                </p>

                <p className="mt-2 text-sm leading-6 text-blue-800">
                  {summary}
                </p>

              </div>

            )}

            {/* Recommendation */}

            {recommendation && (

              <div className="mt-5 rounded-2xl border border-green-100 bg-green-50 p-4">

                <div className="flex gap-3">

                  <div className="size-10 rounded-xl bg-white flex items-center justify-center">

                    <BadgeCheck className="size-5 text-[#00c950]" />

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

            {/* Schemes */}

            {matched_schemes.length > 0 && (

              <div className="mt-6">

                <p className="font-semibold text-zinc-900 mb-3">
                  Eligible Schemes
                </p>

                <div className="space-y-2">

                  {matched_schemes.map((scheme, index) => (

                    <div
                      key={index}
                      className="flex gap-3 rounded-xl border border-zinc-200 p-3"
                    >

                      <FileText className="size-4 mt-0.5 shrink-0 text-[#2563EB]" />

                      <p className="text-sm leading-6 text-zinc-700">
                        {scheme}
                      </p>

                    </div>

                  ))}

                </div>

              </div>

            )}

            {/* Reason */}

            {reason && (

              <div className="mt-6">

                <p className="font-semibold text-zinc-900 mb-2">
                  Why these schemes?
                </p>

                <p className="text-sm leading-7 text-zinc-700">
                  {reason}
                </p>

              </div>

            )}

            {/* Missing Fields */}

            {missing_fields.length > 0 && (

              <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">

                <div className="flex gap-3">

                  <CircleHelp className="size-5 mt-0.5 shrink-0 text-zinc-500" />

                  <div className="flex-1">

                    <p className="font-semibold text-zinc-900">
                      Help me find better schemes
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