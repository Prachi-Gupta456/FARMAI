"use client"

import { Home, MessageCircle, NotebookPen, RotateCcwIcon, User, } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter, usePathname } from "next/navigation"

export default function BottomNav() {

    const router = useRouter()
    const pathname = usePathname()
    const t = useTranslations("bottomNav")


    const isActive = (path) => pathname === path


    return (
        <div className="fixed bottom-2 sm:bottom-4 left-1/2 z-50 w-[95%] max-w-md -translate-x-1/2">

            <div className="relative flex items-center justify-between rounded-[32px]
                            bg-gradient-to-br from-[#0B3B24] via-[#0F4A2C] to-[#0B3B24]
                            p-2 lg:p-4 shadow-[0_20px_60px_rgba(0,60,30,0.45)]
                            ring-1 ring-white/10">

                {/* Profile */}
                <button
                    onClick={() => router.push("/components/settings")}
                    className="group relative flex flex-1 flex-col items-center cursor-pointer gap-1 py-1"
                >
                    <div
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-300
                            ${isActive("/components/settings")
                                ? "bg-[#00C950] text-white shadow-lg shadow-green-900/50 scale-110"
                                : "text-green-200/70 group-hover:bg-white/10 group-hover:text-white"
                            }`}
                    >
                        <User className="size-5" />
                    </div>
                    <span
                        className={`text-[10px] font-semibold transition-colors
                            ${isActive("/components/settings") ? "text-[#00C950]" : "text-green-200/60"}`}
                    >
                        {t("profile")}
                    </span>
                </button>

                {/* Chat */}
                <button
                    onClick={() => router.push("/components/chat")}
                    className="group flex flex-1 flex-col items-center cursor-pointer gap-1 py-1"
                >
                    <div
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-300
                            ${isActive("/components/chat")
                                ? "bg-[#00C950] text-white shadow-lg shadow-green-900/50 scale-110"
                                : "text-green-200/70 group-hover:bg-white/10 group-hover:text-white"
                            }`}
                    >
                        <MessageCircle className="size-5" />
                    </div>
                    <span
                        className={`text-[10px] font-semibold transition-colors
                            ${isActive("/components/chat") ? "text-[#00C950]" : "text-green-200/60"}`}
                    >
                        {t("chat")}
                    </span>
                </button>


                {/* Home */}

                <button
                    onClick={() => router.push("/components/dashboard")}
                    className="-mt-8 group flex flex-1 flex-col items-center"
                >
                    <div
                        className={`relative flex h-16 w-16 items-center justify-center rounded-full
      transition-all duration-300 shadow-xl
      ${isActive("/components/dashboard")
                                ? "bg-[#00C950] scale-110 shadow-green-700/40"
                                : "bg-white border-4 border-[#0F4A2C] text-[#00C950] hover:scale-105"
                            }`}
                    >
                        {/* glow */}
                        <div className="absolute inset-0 rounded-full bg-[#00C950]/20 blur-xl" />

                        <Home
                            className={`relative size-7 ${isActive("/components/dashboard")
                                    ? "text-white"
                                    : "text-[#00C950]"
                                }`}
                        />
                    </div>

                    <span
                        className={`mt-2 text-[10px] font-semibold ${isActive("/components/dashboard")
                                ? "text-[#00C950]"
                                : "text-green-200/70"
                            }`}
                    >
                        {t("home")}
                    </span>
                </button>


                {/* Diary */}
                <button
                    onClick={() => router.push("/components/calendar")}
                    className="group flex flex-1 flex-col items-center cursor-pointer gap-1 py-1"
                >
                    <div
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-300
                            ${isActive("/components/calendar")
                                ? "bg-[#00C950] text-white shadow-lg shadow-green-900/50 scale-110"
                                : "text-green-200/70 group-hover:bg-white/10 group-hover:text-white"
                            }`}
                    >
                        <NotebookPen className="size-5" />
                    </div>
                    <span
                        className={`text-[10px] font-semibold transition-colors
                            ${isActive("/components/calendar") ? "text-[#00C950]" : "text-green-200/60"}`}
                    >
                        {t("diary")}
                    </span>
                </button>

                {/* Profile */}
                <button
                    onClick={() => router.push("/components/chat/history")}
                    className="group flex flex-1 flex-col items-center cursor-pointer gap-1 py-1"
                >
                    <div
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-300
                            ${isActive("/components/chat/history")
                                ? "bg-[#00C950] text-white shadow-lg shadow-green-900/50 scale-110"
                                : "text-green-200/70 group-hover:bg-white/10 group-hover:text-white"
                            }`}
                    >
                        <RotateCcwIcon className="size-5" />
                    </div>
                    <span
                        className={`text-[10px] font-semibold transition-colors
                            ${isActive("/components/chat/history") ? "text-[#00C950]" : "text-green-200/60"}`}
                    >
                        {t("history")}
                    </span>
                </button>

            </div>

        </div>
    )
}