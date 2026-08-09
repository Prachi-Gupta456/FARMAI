"use client"

import { ArrowLeft, Leaf } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function Header({startNewChat}) {

    const router = useRouter()
    const t = useTranslations("chat")

     const handleNewChat = () => {
        startNewChat();                       
        router.push("/components/chat");     
    }

    return (
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-zinc-200">

            <div className="flex justify-between p-4 items-center">

                <button
                    onClick={() => router.push("/components/dashboard")}
                    aria-label="Back to dashboard"
                    className="group size-10 rounded-full border border-zinc-200 flex items-center
                               justify-center transition-all bg-[#00c950] hover:brightness-95
                               active:scale-95 cursor-pointer"
                >
                    <ArrowLeft className="size-5 text-white" />
                </button>

                <div className="text-center">
                    <h1 className="text-lg sm:text-3xl font-bold bg-linear-to-r from-lime-400
                        to-green-700 bg-clip-text text-transparent tracking-tight">
                        AI Assistant
                    </h1>
                    <p className="text-xs text-zinc-400 font-medium tracking-wide">
                        FarmAI
                    </p>
                </div>

                <div className="flex gap-2 justify-between">

                    <button
                        onClick={handleNewChat}
                        className=" rounded-2xl bg-linear-to-br from-lime-400
                    to-green-700 flex items-center justify-center shadow-md
                     shadow-emerald-200 cursor-pointer text-white p-2
                     active:scale-98">
                        {t("newChat")}
                    </button>

                    <div className="size-10 rounded-2xl bg-linear-to-br from-lime-400
                    to-green-700 flex items-center justify-center shadow-md shadow-emerald-200">
                        <Leaf className="size-5 text-white" />
                    </div>

                </div>


            </div>
        </header>
    )
}