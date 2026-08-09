"use client";

import { useRef, useState, useEffect } from "react";
import { Camera, Mic, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { getSpeechLang } from "@/app/lib/getLocaleCookie";
import { speech_lang_map } from "@/app/data/lang";

export default function ChatComposer({
    data,
    setData,
    message,
    onSend,
    setMessage,
}) {
    const t = useTranslations("chat");

    const fileInputRef = useRef(null);
    const recognitionRef = useRef(null)
    const isListeningRef = useRef(false)
    const [isListening, setIsListening] = useState(false);
    const [voiceSupported, setVoiceSupported] = useState(true);
    const [language, setLanguage] = useState("en");
    const [interimTranscript, setInterimTranscript] = useState("");


    const SPEECH_LANG_MAP = speech_lang_map;

    // =========================================================
    // Get current application language
    // =========================================================

    useEffect(() => {
        const locale = getSpeechLang();

        if (locale) {
            setLanguage(locale);
        }
    }, []);

   // =========================================================
// Setup Speech Recognition
// =========================================================

useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        console.warn("[voice] SpeechRecognition API not available in this browser");
        setVoiceSupported(false);
        return;
    }

    setVoiceSupported(true);

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = SPEECH_LANG_MAP[language] || "en-IN";

    console.log("[voice] recognition object created, lang =", recognition.lang);

    // =====================================================
    // Speech started
    // =====================================================

    recognition.onstart = () => {
        console.log("[voice] recognition STARTED");
    };

    // =====================================================
    // Speech result
    // =====================================================

    recognition.onresult = (event) => {
        console.log("[voice] onresult fired, resultIndex:", event.resultIndex, "results length:", event.results.length);

        let finalTranscript = "";
        let interim = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;

            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interim += transcript;
            }
        }

        console.log("[voice] interim:", interim, "| final:", finalTranscript);

        setInterimTranscript(interim);

        if (finalTranscript) {
            setMessage((prev) => `${prev} ${finalTranscript}`.trim());
            setInterimTranscript("");
        }
    };

    // =====================================================
    // Speech error
    // =====================================================

    recognition.onerror = (event) => {
        console.error("[voice] recognition error:", event.error);

        setIsListening(false);
        isListeningRef.current = false;
        setInterimTranscript("");

        if (event.error === "not-allowed") {
            alert("Microphone permission denied. Please allow microphone access.");
        }

        if (event.error === "no-speech") {
            console.log("[voice] no speech detected");
        }
    };

    // =====================================================
    // Speech ended
    // =====================================================

    recognition.onend = () => {
        console.log("[voice] recognition ENDED, isListeningRef:", isListeningRef.current);

        if (isListeningRef.current) {
            try {
                recognition.start();
                console.log("[voice] auto-restarted after onend");
            } catch (error) {
                console.error("[voice] auto-restart FAILED:", error);
                isListeningRef.current = false;
                setIsListening(false);
                setInterimTranscript("");
            }
            return;
        }

        setInterimTranscript("");
    };

    recognitionRef.current = recognition;

    // =====================================================
    // Cleanup
    // =====================================================

    return () => {
        console.log("[voice] cleanup — stopping recognition (effect re-running or unmounting)");
        isListeningRef.current = false;
        try {
            recognition.stop();
        } catch (error) {
            // Ignore if recognition was already stopped
        }
        recognitionRef.current = null;
    };
}, [language]);


// =========================================================
// Mic click
// =========================================================

const handleMicClick = () => {
    console.log("[voice] mic clicked, currently listening:", isListeningRef.current);

    if (!voiceSupported) {
        alert("Voice input isn't supported on this browser. Please try Chrome.");
        return;
    }

    if (!recognitionRef.current) {
        console.error("[voice] recognitionRef.current is null — recognition was never initialized");
        return;
    }

    // ==========================================
    // USER CLICKED MIC TO STOP
    // ==========================================
    if (isListeningRef.current) {
        isListeningRef.current = false;

        try {
            recognitionRef.current.stop();
            console.log("[voice] stop() called successfully");
        } catch (error) {
            console.error("[voice] stop error:", error);
        }

        setIsListening(false);
        setInterimTranscript("");
        return;
    }

    // ==========================================
    // USER CLICKED MIC TO START
    // ==========================================
    isListeningRef.current = true;

    try {
        setMessage("");
        setInterimTranscript("");

        recognitionRef.current.start();
        console.log("[voice] start() called successfully");

        setIsListening(true);
    } catch (error) {
        console.error("[voice] start error:", error);
        isListeningRef.current = false;
        setIsListening(false);
    }
};
 

    // =========================================================
    // Camera
    // =========================================================

    const handleCameraClick = () => {
        fileInputRef.current?.click();
    };

    // =========================================================
    // File upload
    // =========================================================

    const handleFile = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setData((prev) => ({
            ...prev,
            image: file,
        }));

        // Allow selecting same file again
        e.target.value = "";
    };

    // =========================================================
    // Send
    // =========================================================

    const handleSend = () => {
        if (!message.trim()) return;

        // Stop voice if user sends while listening
        if (isListening) {
            try {
                recognitionRef.current?.stop();
            } catch (error) {
                console.error(error);
            }

            setIsListening(false);
            setInterimTranscript("");
        }

        onSend();
    };

    const inputDisabled =
        !data?.crops ||
        data.crops.length === 0 ||
        data.season === "";

    const sendDisabled = !message.trim();

    // =========================================================
    // UI
    // =========================================================

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 backdrop-blur-md">

            <div
                className={`
                    mx-auto flex max-w-3xl items-center gap-2
                    rounded-3xl border bg-white p-2 shadow-lg
                    transition-all duration-300
                    ${isListening
                        ? "border-red-200 shadow-red-100 ring-4 ring-red-50"
                        : "border-zinc-200 focus-within:border-lime-300 focus-within:ring-1 focus-within:ring-lime-200"
                    }
                `}
            >

                {/* ================================================= */}
                {/* Hidden file input */}
                {/* ================================================= */}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFile}
                    className="hidden"
                />

                {/* ================================================= */}
                {/* Camera button */}
                {/* ================================================= */}

                <button
                    type="button"
                    onClick={handleCameraClick}
                    aria-label="Upload image"
                    className="
                        relative flex size-10 shrink-0
                        items-center justify-center
                        rounded-2xl
                        bg-green-50
                        text-[#00c950]
                        transition-all
                        hover:bg-green-100
                        active:scale-90
                    "
                >
                    <Camera className="size-5" />

                    {data?.image && (
                        <span
                            className="
                                absolute
                                -right-1
                                -top-1
                                size-3
                                rounded-full
                                border-2
                                border-white
                                bg-[#00c950]
                            "
                        />
                    )}
                </button>

                {/* ================================================= */}
                {/* Input / Listening UI */}
                {/* ================================================= */}

                <div className="relative flex min-w-0 flex-1 items-center">

                    {isListening ? (
                        <div
                            className="
                                flex min-h-10
                                w-full
                                items-center
                                gap-3
                                px-2
                            "
                        >

                            {/* ------------------------------------- */}
                            {/* Listening mic indicator */}
                            {/* ------------------------------------- */}

                            <div
                                className="
                                    relative
                                    flex
                                    size-8
                                    shrink-0
                                    items-center
                                    justify-center
                                "
                            >

                                {/* Outer pulse */}

                                <span
                                    className="
                                        absolute
                                        inset-0
                                        animate-ping
                                        rounded-full
                                        bg-red-400/20
                                    "
                                />

                                {/* Inner circle */}

                                <span
                                    className="
                                        relative
                                        flex
                                        size-7
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-red-50
                                    "
                                >
                                    <Mic className="size-4 text-red-500" />
                                </span>

                            </div>

                            {/* ------------------------------------- */}
                            {/* Animated waveform */}
                            {/* ------------------------------------- */}

                            <div
                                className="
                                    flex
                                    h-8
                                    shrink-0
                                    items-center
                                    gap-[3px]
                                "
                            >
                                <span className="voice-bar" />
                                <span className="voice-bar" />
                                <span className="voice-bar" />
                                <span className="voice-bar" />
                                <span className="voice-bar" />
                                <span className="voice-bar" />
                                <span className="voice-bar" />
                            </div>

                            {/* ------------------------------------- */}
                            {/* Live transcript */}
                            {/* ------------------------------------- */}

                            <div
                                className="
                                    min-w-0
                                    flex-1
                                    truncate
                                    text-sm
                                "
                            >

                                {interimTranscript ? (
                                    <span className="italic text-zinc-400">
                                        {interimTranscript}
                                    </span>
                                ) : (
                                    <span
                                        className="
                                            font-semibold
                                            text-red-500
                                        "
                                    >
                                        Listening...
                                    </span>
                                )}

                            </div>

                        </div>
                    ) : (
                        <input
                            disabled={inputDisabled}
                            className="
                                w-full
                                bg-transparent
                                px-1
                                text-sm
                                outline-none
                                placeholder:text-zinc-400
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                            value={message}
                            type="text"
                            placeholder={t("askSomething")}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSend();
                                }
                            }}
                        />
                    )}

                </div>

                {/* ================================================= */}
                {/* Mic button */}
                {/* ================================================= */}

                <button
                    type="button"
                    onClick={handleMicClick}
                    disabled={inputDisabled}
                    aria-label={
                        isListening
                            ? "Stop listening"
                            : "Start voice input"
                    }
                    className={`
                        relative
                        flex
                        size-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        transition-all
                        duration-300
                        active:scale-90
                        disabled:cursor-not-allowed
                        disabled:opacity-40

                        ${isListening
                            ? `
                                    bg-gradient-to-br
                                    from-red-500
                                    to-rose-600
                                    text-white
                                    shadow-lg
                                    shadow-red-300
                                `
                            : `
                                    text-zinc-500
                                    hover:bg-zinc-100
                                    hover:text-zinc-700
                                `
                        }
                    `}
                >

                    {/* Listening pulse */}

                    {isListening && (
                        <>
                            <span
                                className="
                                    absolute
                                    inset-0
                                    animate-ping
                                    rounded-2xl
                                    bg-red-400/30
                                "
                            />

                            <span
                                className="
                                    absolute
                                    -inset-1
                                    animate-pulse
                                    rounded-2xl
                                    border
                                    border-red-300/60
                                "
                            />
                        </>
                    )}

                    <Mic
                        className="
                            relative
                            z-10
                            size-5
                        "
                    />

                </button>

                {/* ================================================= */}
                {/* Send button */}
                {/* ================================================= */}

                <button
                    type="button"
                    onClick={handleSend}
                    disabled={sendDisabled}
                    aria-label="Send message"
                    className={`
                        flex
                        size-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        shadow-md
                        transition-all
                        active:scale-90

                        ${sendDisabled
                            ? `
                                    cursor-not-allowed
                                    from-gray-200
                                    to-gray-300
                                    text-gray-400
                                `
                            : `
                                    from-lime-500
                                    to-lime-600
                                    text-white
                                    hover:shadow-lg
                                `
                        }
                    `}
                >
                    <Send className="size-5" />
                </button>

            </div>
        </div>
    );
}