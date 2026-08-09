"use client"

import { getSpeechLang } from "@/app/lib/getLocaleCookie"
import {
  Sprout,
  Leaf,
  CloudSun,
  TriangleAlert,
  CircleHelp,
  BadgeCheck,
  Volume2,
  Heart,
} from "lucide-react"

export default function CropRecommendationBubble({
  message
}) {

  if (!message) return null

  const result = message.data || {}

  const {
    recommended_crops = [],
    reason,
    expected_conditions = [],
    precautions = [],
    missing_fields = [],
  } = result


  const handleListen = () => {
    if (!window.speechSynthesis) {
      alert("Something went wrong...")
      return
    }

    let textToSpeak = ""

    if (recommended_crops.length > 0) {
      textToSpeak += `Recommended crops are: ${recommended_crops.join(", ")}. `
    }
    if (reason) {
      textToSpeak += `${reason}. `
    }
    if (expected_conditions.length > 0) {
      textToSpeak += `${expected_conditions.join(". ")}. `
    }
    if (precautions.length > 0) {
      textToSpeak += `${precautions.join(". ")}. `
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

      <div className="size-10 shrink-0 rounded-2xl bg-[#F3FCF6] flex items-center justify-center">
        <Sprout className="size-5 text-[#00c950]" />
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
                  <Sprout className="size-6 text-[#00c950]" />
                </div>

                <div>

                  <h3 className="font-semibold text-zinc-900">
                    Crop Recommendation
                  </h3>

                  <p className="text-xs text-zinc-500">
                    AI Crop Expert
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

            {/* Recommended Crops */}

            {recommended_crops.length > 0 && (

              <div className="mt-5">

                <p className="font-semibold text-zinc-900 mb-3">
                  Recommended Crops
                </p>

                <div className="flex flex-wrap gap-2">

                  {recommended_crops.map((crop, index) => (

                    <div
                      key={index}
                      className="flex items-center gap-2 rounded-full bg-[#F3FCF6] border border-green-100 px-4 py-2"
                    >
                      <Leaf className="size-4 text-[#00c950]" />
                      <span className="text-sm font-medium text-zinc-800">
                        {crop}
                      </span>
                    </div>

                  ))}

                </div>

              </div>

            )}

            {/* Reason */}

            {reason && (

              <div className="mt-5 rounded-2xl border border-green-100 bg-green-50 p-4">

                <div className="flex gap-3">

                  <div className="size-10 rounded-xl bg-white flex items-center justify-center">

                    <BadgeCheck className="size-5 text-[#00c950]" />

                  </div>

                  <div>

                    <p className="font-semibold text-green-900">
                      Why these crops?
                    </p>

                    <p className="mt-1 text-sm leading-6 text-green-800">
                      {reason}
                    </p>

                  </div>

                </div>

              </div>

            )}

            {/* Expected Conditions */}

            {expected_conditions.length > 0 && (

              <div className="mt-6">

                <p className="font-semibold text-zinc-900 mb-3">
                  Expected Conditions
                </p>

                <div className="space-y-2">

                  {expected_conditions.map((item, index) => (

                    <div
                      key={index}
                      className="flex gap-3 rounded-xl border border-zinc-200 p-3"
                    >

                      <CloudSun className="size-4 mt-0.5 shrink-0 text-blue-500" />

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

            {/* Missing Fields */}

            {missing_fields.length > 0 && (

              <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">

                <div className="flex gap-3">

                  <CircleHelp className="size-5 mt-0.5 shrink-0 text-zinc-500" />

                  <div className="flex-1">

                    <p className="font-semibold text-zinc-900">
                      Help me improve recommendations
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
                          {field.replaceAll("_", " ")}
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