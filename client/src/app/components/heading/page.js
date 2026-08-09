"use client"
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Heading({ name, desc }) {

    const router = useRouter()

    return (
        <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/80 backdrop-blur-xl">

            <div className="flex items-center justify-between px-4 py-3.5">

                <button
                    onClick={() => router.back()}
                    className="group size-10 cursor-pointer rounded-full  border
                 border-zinc-200 flex items-center justify-center transition-all 
                bg-[#00c950]">
                    <ArrowBigLeft className="size-5 text-white fill-[#FAF4F6]" />
                </button>

                <div className="flex items-center gap-2.5">

                    <div className="text-center">
                        <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-green-600 via-emerald-600
                         to-green-700 bg-clip-text text-transparent tracking-tight">
                            {name}
                        </h1>
                        <p className="text-xs text-zinc-400 font-medium tracking-wide">
                            {desc}
                        </p>
                    </div>

                </div>

                <div className="size-10" />

            </div>

            <div className="h-[2px] bg-linear-to-r from-transparent via-green-400/60 to-transparent" />

        </header>
    )
}