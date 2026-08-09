"use client"
import{
    ArrowLeft
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation"

export default function CardHeader({ name, Icon }) {

    const router = useRouter()
     const t = useTranslations("cardHeader")

    return (
        <div className="flex justify-between items-center gap-2">

            <div
                onClick={() => router.back()}
                className="size-11 shrink-0 cursor-pointer shadow-sm rounded-full bg-[#00c950] 
                             border-[#D9E6DE] border border-solid flex justify-center items-center">
                <ArrowLeft className="size-5 text-[#FAF4F6]" />
            </div>

            <div className="text-center min-w-0 flex-1 px-1">
                <div className="text-[#2D6A4F] text-sm sm:text-3xl font-bold tracking-tight truncate">
                    {name}
                </div>
                <div className="text-[#71717b] text-sm leading-5 truncate">
                    {t("subtitle")}
                </div>
            </div>


            <div
                className="size-11 shrink-0 shadow-sm rounded-full 
                            bg-[#00c950] border-[#D9E6DE] border border-solid flex justify-center items-center">
                <Icon className="size-5 text-white" />
            </div>

        </div>
    )
}