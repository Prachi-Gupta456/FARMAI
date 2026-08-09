"use client"

import { Sparkles, Leaf } from "lucide-react";
import { useTranslations } from "next-intl";


export default function ChatWelcome({ handleSend }) {

    const t = useTranslations("welcomeCard")
    const suggestions = t.raw("suggestions");


    return (
        <div className="flex flex-col items-center text-center px-6 py-10">

            <div className="size-12 lg:size-15 rounded-2xl bg-gradient-to-br from-lime-400 to-green-500
                flex items-center justify-center shadow-md shadow-emerald-200">
                <Leaf className="size-6 lg:size-8 text-white" />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-zinc-800">
                FarmAI
            </h2>

            <p className="mt-3 max-w-md text-zinc-500 leading-7">
                {t("description")}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                {suggestions.map((item, index) => (
                    <button
                        onClick={() => handleSend(item)}
                        key={index}
                        className="flex items-center gap-1.5 rounded-full border border-zinc-200
                                    bg-white px-4 py-2.5 text-sm font-medium text-zinc-700
                                    hover:border-[#00c950] hover:text-[#00c950]
                                    hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                        <Sparkles className="size-3.5 text-[#00c950] shrink-0" />
                        {item}
                    </button>
                ))}
            </div>

        </div>
    )
}