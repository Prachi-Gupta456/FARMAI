"use client";

import TimeAgo from "@/app/lib/getTime";
import { setAuthToken } from "@/app/lib/setToken";
import { deleteChat, fetchChats } from "@/app/services/api";
import { useAuth } from "@clerk/nextjs";
import {
    ArrowLeft,
    Sprout,
    Clock,
    Trash2,
    Plus,
    ChevronRight,
    Loader2
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BottomNav from "../../bottom-nav/page";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";

export default function History() {
    const router = useRouter();
    const [recentChats, setRecentChats] = useState([]);
    const [loadingChats, setLoadingChats] = useState(true);
    const { getToken } = useAuth()
    const [deletingChatId, setDeletingChatId] = useState(null);
    const t = useTranslations("history")

    useEffect(() => {
        async function init() {
            try {
                const token = await getToken();

                setAuthToken(token);

                const chatResult = await fetchChats()


                if (chatResult.success) {


                    setRecentChats(chatResult.chats)
                }


            } catch (err) {
                console.error("Failed to initialise history:", err);
            } finally {
                setLoadingChats(false);
            }
        }

        init();

    }, [])

    const handleDeleteChat = async (chatId) => {
        const result = await Swal.fire({
            title: t("deleteTitle"),
            text: t("deleteText"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: t("delete"),
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#ef4444",
            width: "360px",
        });

        if (!result.isConfirmed) return;

        setDeletingChatId(chatId);

        try {
            const res = await deleteChat(chatId);

            if (!res.success) {
                throw new Error();
            }

            setRecentChats((prev) =>
                prev.filter((chat) => chat._id !== chatId)
            );
        } catch {
            Swal.fire({
                icon: "error",
                title: t("failedDelete"),
                text: t("tryAgain"),
            });

            setDeletingChatId(null);
        }
    };


    return (
        <main className="min-h-screen bg-[#fafafa] pb-24">

            {/* Header */}

            <header
             className="sticky top-0 z-20 border-b border-zinc-100 bg-white/80 backdrop-blur-xl">

                <div
                 className="h-20 px-4 flex items-center justify-between ">

                    {/* Left Section */}

                    <div className="flex items-center gap-3">


                        {/* Back Button */}

                        <button
                            onClick={() => router.back()}
                            className="group size-11 rounded-2xl border border-zinc-200 bg-white
                                     flex items-center justify-center shadow-sm transition-all
                                    duration-300 hover:border-green-200 hover:bg-green-50
                                    hover:-translate-x-1 active:scale-95">
                
                            <ArrowLeft
                                className="size-5 text-zinc-600 transition group-hover:text-green-600"/>
                        </button>

                        {/* Title */}

                        <div className="flex items-center gap-3">

                            <div
                                className="flex h-11 w-11 items-center justify-center
                                     rounded-2xl bg-gradient-to-br from-green-500  to-emerald-600
                                    shadow-lg shadow-green-200
                                    ">
                                <Sprout className="size-6 text-white" />
                            </div>

                            <div>

                                <h1
                                    className="text-xl font-extrabold tracking-tight text-zinc-900">
                                    {t("title")}
                                </h1>

                                <p className="
                        text-xs
                        font-medium
                        text-zinc-400
                    ">
                                    {t("subtitle")}
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* Right Accent */}

                    <div
                        className="hidden sm:flex items-center gap-2 rounded-full
                            bg-green-50 px-4 py-2  text-xs font-semibold text-green-700">

                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        {t("brand")}
                    </div>


                </div>

            </header>


            {loadingChats && (
                <div className="rounded-2xl border border-zinc-100 p-4 text-center
                   text-zinc-400 text-sm animate-pulse">
                    {t("loading")}
                </div>
            )}


            <div className="px-4 py-5 space-y-5">

                {!loadingChats && recentChats.length === 0 && (
                    <div className="px-4 pt-10">

                        <div
                            className="relative overflow-hidden rounded-3xl 
                                  border border-green-100 bg-gradient-to-br from-white
                                   via-green-50 to-emerald-50 p-8 text-center shadow-sm">

                            {/* Glow */}
                            <div
                                className="absolute -right-10 -top-10 h-32 w-32 
                                 rounded-full  bg-green-200/40 blur-3xl" />

                            <div
                                className="mx-auto mb-5 flex h-20 w-20
                                        items-center justify-center rounded-3xl
                                        bg-gradient-to-br from-[#00c950] to-[#15803d] text-white shadow-lg ">
                                <Sprout className="size-10" />
                            </div>


                            <h2
                                className="text-xl font-bold text-zinc-900">
                                {t("emptyTitle")}
                            </h2>


                            <p
                                className="mt-3 text-sm leading-6 text-zinc-500">
                                {t("emptyDescription")}
                            </p>


                            <button
                                onClick={() => router.push("/components/chat")}
                                className="mt-7 flex w-full items-center justify-center gap-2
                                         cursor-pointer  rounded-2xl  bg-gradient-to-r from-[#00c950] to-[#15803d]
                                        px-5 py-4 text-sm font-bold text-white  shadow-lg shadow-green-200  
                                        transition hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]">

                                <Plus className="size-5" />
                                {t("startChat")}
                            </button>

                        </div>

                    </div>
                )}


                {!loadingChats && recentChats.length > 0 && (
                    <div className="px-4 py-5 space-y-4">

                        {recentChats.map((chat) => (

                            <div
                                key={chat._id}
                                onClick={() => router.push(`/components/chat/${chat._id}`)}
                                className={`group flex items-center gap-3 rounded-3xl border p-4 shadow-sm
                                            transition-all duration-300
                                        ${deletingChatId === chat._id
                                        ? "opacity-50 scale-95 pointer-events-none"
                                        : "bg-white hover:-translate-y-1 hover:shadow-lg hover:border-green-200 cursor-pointer"
                                    }`}>

                                {/* Icon */}

                                <div
                                    className="flex h-12 w-12 shrink-0 items-center justify-center
                                        rounded-2xl bg-gradient-to-br from-green-100
                                     to-emerald-50 text-[#00c950]">
                                    <Sprout className="size-6" />
                                </div>


                                {/* Content */}

                                < div className="min-w-0 flex-1" >

                                    <p
                                        className="truncate font-bold text-sm text-zinc-900">
                                        {chat.title}
                                    </p>

                                    <div className="mt-1 flex items-center gap-1 text-xs text-zinc-400">
                                        <Clock className="size-3" />
                                        <TimeAgo createdAt={chat.createdAt} />
                                    </div>

                                </div>


                                {/* Delete */}

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteChat(chat._id);
                                    }}
                                    disabled={deletingChatId === chat._id}
                                    className="rounded-xl p-2.5 transition"
                                >
                                    {deletingChatId === chat._id ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="size-4 animate-spin text-red-500" />
                                            <span className="text-xs text-zinc-500">
                                                {t("deleting")}
                                            </span>
                                        </div>
                                    ) : (
                                        <Trash2 className="size-4 text-zinc-400 hover:text-red-500" />
                                    )}
                                </button>

                                <ChevronRight
                                    className="size-5 text-zinc-300 transition group-hover:text-green-500"
                                />
                            </div>
                        ))}

                    </div>
                )}

            </div >

            <BottomNav />
        </main >
    );
}