
"use client"

import { useEffect, useState } from "react"

export default function UserBubble({ message }) {
    if (!message) return null

    const previewUrl =
        message.image instanceof File
            ? URL.createObjectURL(message.image)
            : message.image;

    return (
        <div className="flex items-end gap-2 flex-row-reverse">
            <div className="w-8 h-8 shrink-0 rounded-2xl flex items-center justify-center bg-gray-200">
                <span className="text-xs font-semibold text-gray-600">You</span>
            </div>

            <div className="max-w-[75%] flex flex-col items-end">

                {previewUrl && (
                    <div className="mb-1.5 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                        <img
                            src={previewUrl}
                            alt="Uploaded"
                            className="max-w-[220px] max-h-[220px] object-cover"
                        />
                    </div>
                )}

                {message?.text && (
                    <div className="px-4 py-2.5 text-sm leading-relaxed shadow-sm bg-[#00c950] text-white rounded-3xl rounded-br-lg">
                        {message.text}
                    </div>
                )}

                <span className="text-[10px] text-gray-400 mt-1 px-1">{message?.time}</span>
            </div>
        </div>
    )
}