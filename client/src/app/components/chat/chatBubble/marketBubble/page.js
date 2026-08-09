"use client"

import { getSpeechLang } from "@/app/lib/getLocaleCookie"
import {
  IndianRupee,
  Store,
  TrendingUp,
  CircleHelp,
  Volume2,
  Heart,
  BadgeCheck,
} from "lucide-react"

export default function MarketBubble({
  message
}) {

  if (!message) return null

  const result = message.data || {}

  const {
    summary,
    best_market,
    recommendation,
    reason,
    expected_price,
    missing_fields = [],
  } = result

  const handleListen = () => {
  if (!window.speechSynthesis) {
    alert("Something went wrong...")
    return
  }

  let textToSpeak = ""

  if (summary) {
    textToSpeak += `Market summary: ${summary}. `
  }

  if (recommendation) {
    textToSpeak += `Recommendation: ${recommendation}. `
  }

  if (best_market) {
    textToSpeak += `Best market: ${best_market}. `
  }

  if (expected_price) {
    textToSpeak += `Expected price: ${expected_price} rupees. `
  }

  if (reason) {
    textToSpeak += `Why this recommendation: ${reason}. `
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

      <div className="size-10 shrink-0 rounded-2xl bg-[#F8F4FF] flex items-center justify-center">
        <IndianRupee className="size-5 text-[#7C3AED]" />
      </div>

      <div className="max-w-[85%]">

        <div className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-sm">

          {/* Accent */}

          <div className="h-1 bg-[#7C3AED]" />

          <div className="p-5">

            {/* Header */}

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-3">

                <div className="size-12 rounded-2xl bg-violet-50 flex items-center justify-center">
                  <IndianRupee className="size-6 text-[#7C3AED]" />
                </div>

                <div>

                  <h3 className="font-semibold text-zinc-900">
                    Market Insight
                  </h3>

                  <p className="text-xs text-zinc-500">
                    AI Market Assistant
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

            {/* Summary */}

            {summary && (

              <div className="mt-5 rounded-2xl border border-violet-100 bg-violet-50 p-4">

                <p className="font-semibold text-violet-900">
                  Market Summary
                </p>

                <p className="mt-2 text-sm leading-6 text-violet-800">
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

            {/* Price + Market */}

            <div className="grid grid-cols-2 gap-3 mt-5">

              <div className="rounded-2xl border border-zinc-200 p-4">

                <Store className="size-5 text-[#7C3AED]" />

                <p className="mt-3 text-xs text-zinc-500">
                  Best Market
                </p>

                <p className="font-semibold text-zinc-900 mt-1">
                  {best_market}
                </p>

              </div>

              <div className="rounded-2xl border border-zinc-200 p-4">

                <TrendingUp className="size-5 text-[#00c950]" />

                <p className="mt-3 text-xs text-zinc-500">
                  Expected Price
                </p>

                <p className="font-semibold text-zinc-900 mt-1">
                  ₹ {expected_price}
                </p>

              </div>

            </div>

            {/* Reason */}

            {reason && (

              <div className="mt-6">

                <p className="font-semibold text-zinc-900 mb-2">
                  Why this recommendation?
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
                      Help me improve market advice
                    </p>

                    <p className="mt-1 text-sm text-zinc-600">
                      Please provide:
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">

                      {missing_fields.map((field) => (

                        <button
                          key={field}
                          className="rounded-full border border-violet-200 bg-white px-3 py-1.5 text-xs font-medium text-violet-700 hover:bg-violet-50 transition"
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