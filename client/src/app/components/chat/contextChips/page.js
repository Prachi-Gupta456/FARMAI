"use client"

import { X, Pencil } from "lucide-react"


export default function ContextChips({
    data,
    setData,
    onEdit
}) {

    const chips = []


    if (data.crops.length > 0) {

        data.crops?.forEach((crop) => {

            chips.push({
                key: `crop-${crop}`,
                icon: "🌾",
                value: crop,
                field: "crops",
                itemValue: crop,
            })

        })
    }


    if (data.season) {

        chips.push({
            key: "season",
            icon: "☀️",
            value: data.season,
            field: "season",
        })

    }

    // Image
    if (data.image) {

        chips.push({
            key: "image",
            icon: "📷",
            value: "Leaf Uploaded",
            field: "image",
        })
    }

    if (chips.length === 0) return null

    const handleRemove = (chip) => {

        setData((prev) => {

            const updated = { ...prev }

            if (Array.isArray(prev[chip.field])) {

                updated[chip.field] = prev[chip.field].filter(
                    (v) => v !== chip.itemValue
                )

            } else if (chip.field === "image") {

                updated[chip.field] = null

            } else {

                updated[chip.field] = ""

            }

            return updated

        })

    }

    return (

        <div className="flex flex-wrap items-center gap-2 px-4 py-3">

            {chips.map((chip) => (

                <div
                    key={chip.key}
                    className="group flex items-center gap-2 rounded-full
                    border border-green-200 bg-green-50
                    px-3 py-2 text-sm font-medium text-green-700
                    shadow-sm transition-all
                    hover:border-[#00c950] hover:bg-green-100"
                >

                    <span className="text-base">
                        {chip.icon}
                    </span>

                    <span>
                        {chip.value}
                    </span>

                    <button
                        onClick={() => handleRemove(chip)}
                        className="rounded-full p-0.5 transition hover:bg-green-200"
                    >
                        <X className="size-3.5" />
                    </button>

                </div>

            ))}

            <button
                onClick={onEdit}
                className="flex items-center gap-2 rounded-full
                border border-zinc-200 bg-white
                px-4 py-2 text-sm font-medium text-zinc-600
                shadow-sm transition-all
                hover:border-[#00c950]
                hover:text-[#00c950]
                hover:-translate-y-0.5"
            >

                <Pencil className="size-4" />

                Edit

            </button>

        </div>

    )

}