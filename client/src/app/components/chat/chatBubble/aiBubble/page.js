"use client"

import { Sparkles } from "lucide-react"
import WeatherBubble from "../weatherBubble/page"
import PestBubble from "../pestBubble/page"
import IrrigationBubble from "../irrigationBubble/page"
import FertilizerBubble from "../fertilizerBubble/page"
import SchemeBubble from "../schemeBubble/page"
import MarketBubble from "../marketBubble/page"
import CropRecommendationBubble from "../cropRecommendationBubble/page"
import FallbackBubble from "../fallbackBubble/page"
import DiseaseBubble from "../diseaseBubble/page"

const AGENT_BUBBLES = {
    weather: WeatherBubble,
    pest: PestBubble,
    irrigation: IrrigationBubble,
    fertilizer: FertilizerBubble,
    scheme: SchemeBubble,
    market: MarketBubble,
    crop_recommendation: CropRecommendationBubble,
    fallback: FallbackBubble,
    disease:DiseaseBubble
}

export default function AiBubble({ message, accent = "from-sky-400 to-blue-600" }) {
    if (!message) return null

    const AgentBubble = AGENT_BUBBLES[message?.agent]

    if (AgentBubble) {
        return <AgentBubble message={message} />
    }

   
    return (
        <div className="flex items-end gap-2">
            <div className={`w-8 h-8 shrink-0 rounded-2xl flex items-center justify-center bg-gradient-to-br ${accent}`}>
                <Sparkles className="w-4 h-4 text-white" />
            </div>

            <div className="max-w-[75%] flex flex-col items-start">
                <div className="px-4 py-2.5 text-sm leading-relaxed shadow-sm bg-white border border-gray-100 text-gray-800 rounded-3xl rounded-bl-lg">
                    {message?.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">{message?.time}</span>
            </div>
        </div>
    )
}