"use client"

import { getSpeechLang } from "@/app/lib/getLocaleCookie"
import {
  ShieldAlert,
  Pill,
  TriangleAlert,
  Volume2,
  Heart,
} from "lucide-react"

export default function DiseaseBubble({
  message
}) {

  if (!message) return null

  const result = message.data || {}

  const {
    disease_name,
    confidence,
    summary,
    treatment = [],
    precautions = [],
  } = result


   const handleListen = () => {
    if (!window.speechSynthesis) {
      alert("Something went wrong...")
      return
    }

    let textToSpeak = ""

    if (disease_name) {
      textToSpeak += `Detected disease: ${disease_name}. `
    }
    if (confidence) {
      textToSpeak += `Confidence level: ${confidence} percent. `
    }
    if (summary) {
      textToSpeak += `${summary}. `
    }
    if (treatment.length > 0) {
      textToSpeak += `Treatment: ${treatment.join(". ")}. `
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

      {/* Avatar */}

      <div className="size-10 shrink-0 rounded-2xl bg-red-50 flex items-center justify-center">
        <ShieldAlert className="size-5 text-red-500" />
      </div>

      <div className="max-w-[85%]">

        <div className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-sm">

          {/* Accent */}

          <div className="h-1 bg-red-500" />

          <div className="p-5">

            {/* Header */}

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-3">

                <div className="size-12 rounded-2xl bg-red-50 flex items-center justify-center">
                  <ShieldAlert className="size-6 text-red-500" />
                </div>

                <div>

                  <h3 className="font-semibold text-zinc-900">
                    Disease Detection
                  </h3>

                  <p className="text-xs text-zinc-500">
                    AI Disease Expert
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

            {/* Disease Name */}

            <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-4">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs uppercase font-semibold tracking-wide text-red-600">
                    Detected Disease
                  </p>

                  <h4 className="mt-1 text-lg font-bold text-red-700">
                    {disease_name}
                  </h4>

                </div>

                <div className="rounded-xl bg-white px-4 py-2 border border-red-100 text-center">

                  <p className="text-xs text-zinc-500">
                    Confidence
                  </p>

                  <p className="font-bold text-red-600">
                    {confidence}%
                  </p>

                </div>

              </div>

            </div>

            {/* Summary */}

            {summary && (

              <div className="mt-5">

                <p className="font-semibold text-zinc-900 mb-2">
                  Diagnosis
                </p>

                <p className="text-sm leading-7 text-zinc-700">
                  {summary}
                </p>

              </div>

            )}

            {/* Treatment */}

            {treatment.length > 0 && (

              <div className="mt-6">

                <p className="font-semibold text-zinc-900 mb-3">
                  Treatment
                </p>

                <div className="space-y-2">

                  {treatment.map((item, index) => (

                    <div
                      key={index}
                      className="flex gap-3 rounded-xl border border-zinc-200 p-3"
                    >

                      <Pill className="size-4 mt-0.5 shrink-0 text-[#00c950]" />

                      <p className="text-sm leading-6 text-zinc-700">
                        {item}
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

          </div>

        </div>

        <p className="mt-2 ml-2 text-[10px] text-zinc-400">
          {message.time}
        </p>

      </div>

    </div>
  )
}