"use client"

import { useEffect, useState } from 'react';
import {
    MapPin, Globe2, Check, Globe, LocateFixed, LoaderCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation'
import { fetchUser, reverseGeocode, saveUser } from '@/app/services/api';
import { useAuth } from '@clerk/nextjs';
import { setAuthToken } from '@/app/lib/setToken';
import Swal from 'sweetalert2';
import { useTranslations } from 'next-intl';

export default function OnboardingPage() {

    const t = useTranslations("onboarding")

    const languages = ["English", "Hindi", "Marathi", "Kannada", "Tamil", "Telugu", "Bengali"];
    const states = ["Uttar Pradesh", "Bihar", "Punjab", "Maharashtra", "Karnataka"];

    const router = useRouter()
    const { getToken } = useAuth()

    const [state, setState] = useState("");
    const [district, setDistrict] = useState("");
    const [language, setLanguage] = useState("English");
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")

    const [locLoading, setLocLoading] = useState(false)
    const [locErr, setLocErr] = useState("")
    const [saving, setSaving] = useState(false)
    const [step, setStep] = useState(1)

    const [checkingUser, setCheckingUser] = useState(true)


    const handleUseCurrentLocation = () => {
        if (!navigator.geolocation) {
            setLocErr(t("errors.geoNotSupported"))
            return
        }

        setLocLoading(true)
        setLocErr("")

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords

                const result = await reverseGeocode(latitude, longitude)

                if (!result.success) {
                    setLocErr(result.msg)
                    setLocLoading(false)
                    return;
                }

                setLatitude(latitude)
                setLongitude(longitude)
                setState(result.address?.state)
                setDistrict(result.address?.state_district)

                setLocLoading(false)
            },
            (error) => {
                setLocLoading(false)
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        setLocErr(t("errors.permissionDenied"))
                        break
                    case error.POSITION_UNAVAILABLE:
                        setLocErr(t("errors.positionUnavailable"))
                        break
                    case error.TIMEOUT:
                        setLocErr(t("errors.timeout"))
                        break
                    default:
                        setLocErr(t("errors.generic"))
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        )
    };


    // Step 1 → Step 2
    const handleLanguageContinue = () => {
        setStep(2)
    }

    // Step 2 → Save everything to backend
    const handleSave = async () => {
        if (!state || !district) {
            setLocErr(t("errors.provideStateDistrict"))
            return
        }

        setSaving(true)
        setLocErr("")

        try {
            const token = await getToken();
            setAuthToken(token)

            const data = {
                lat:latitude, lng:longitude, state, district, language
            }
            const res = await saveUser(data)

            if (res.success) {
                setStep(3)
            } else {
                const msg = res.user_warning ? res.msg : t("errors.saveFailed")
                Swal.fire({
                    title: msg,
                    icon: 'error'
                })
                
                    setState("")
                    setDistrict("")
                    setLanguage("English")
                    setStep(1)
                
            }
        } catch (err) {
            console.error("Failed to save user:", err)
            setLocErr(t("errors.generic"))
        } finally {
            setSaving(false)
        }
    }

    useEffect(() => {
        if (step === 3) {
            const timer = setTimeout(() => {
                router.push("/components/dashboard");
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [step]);

    useEffect(() => {
        async function init() {
            try {
                const token = await getToken();
                setAuthToken(token);

                const res = await fetchUser();

                if (res.success) {
                    router.push("/components/dashboard")
                    return
                }
            } catch (err) {
                console.error("Failed to check user:", err)
            } finally {
                setCheckingUser(false)
            }
        }
        init();
    }, []);


    if (checkingUser) {
        return (
            <div className="flex min-h-screen w-full items-center justify-center bg-[linear-gradient(180deg,#F6FAF6_0%,#FAFAF7_100%)]">
                <LoaderCircle className="size-8 animate-spin text-[#00C950]" />
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full bg-[linear-gradient(180deg,#F6FAF6_0%,#FAFAF7_100%)]">

            <div className="mx-auto max-w-3xl space-y-4 p-4 sm:p-5 lg:space-y-6 lg:p-8">

                {/* Step indicator */}
                <div className="flex items-center justify-center gap-2 pt-4">
                    <div
                        className={`h-2 w-8 rounded-full transition-all ${step === 1 ? "bg-[#00C950]" : "bg-green-200"}`} />
                    <div
                        className={`h-2 w-8 rounded-full transition-all ${step === 2 ? "bg-[#00C950]" : "bg-zinc-200"}`} />
                </div>

                {/* ================= STEP 1: Language Card ================= */}
                {step === 1 && !checkingUser && (
                    <div className="rounded-3xl border border-zinc-200 bg-white p-6 
                        shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                        <div className="mb-6 flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center
                                rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600
                                text-white shadow-lg">
                                <Globe className="size-7" />
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-zinc-900">
                                    {t("languageStep.title")}
                                </h3>
                                <p className="text-sm text-zinc-500">
                                    {t("languageStep.subtitle")}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                            {languages.map((lang) => {
                                const active = language === lang;
                                return (
                                    <button
                                        key={lang}
                                        onClick={() => setLanguage(lang)}
                                        className={`relative flex flex-col items-center justify-center
                                            rounded-2xl border p-4 transition-all duration-300 
                                            active:scale-95 ${active
                                                ? "border-green-600 bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg"
                                                : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-green-400 hover:bg-green-50 hover:shadow-md"
                                            }`}
                                    >
                                        {active && (
                                            <div className="absolute right-2 top-2 flex h-5 w-5 
                                                items-center justify-center rounded-full bg-white
                                                text-green-600">
                                                <Check className="size-3 stroke-[3]" />
                                            </div>
                                        )}
                                        <Globe2 className="mb-2 size-6" />
                                        <span className="text-sm font-semibold">
                                            {lang}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Step 1 button */}
                        <button
                            onClick={handleLanguageContinue}
                            className="group relative mt-6 flex h-14 w-full items-center justify-center 
                                overflow-hidden rounded-2xl cursor-pointer
                                bg-gradient-to-r from-[#00C950] via-[#16A34A] to-[#15803D]
                                text-white shadow-xl transition-all duration-300
                                hover:-translate-y-1 hover:shadow-2xl active:scale-[0.98]">

                            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r 
                                from-transparent via-white/20 to-transparent transition-transform
                                duration-700 group-hover:translate-x-full" />

                            <span className="text-base font-bold tracking-wide">
                                {t("languageStep.continue")}
                            </span>
                        </button>
                    </div>
                )}

                {/* ================= STEP 2: Location Card ================= */}
                {step === 2 && !checkingUser && (
                    <div className="group rounded-3xl border border-zinc-200 bg-white p-6 
                        shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                        <div className="mb-6 flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl
                                bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-lg">
                                <MapPin className="size-7" />
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-zinc-900">
                                    {t("locationStep.title")}
                                </h3>
                                <p className="text-sm text-zinc-500">
                                    {t("locationStep.subtitle")}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-5">

                            {/* Use Current Location */}
                            <button
                                type="button"
                                onClick={handleUseCurrentLocation}
                                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl
                                    bg-gradient-to-r from-blue-50 to-indigo-50
                                    text-blue-600 font-semibold text-sm
                                    border border-blue-100
                                    transition hover:from-blue-100 hover:to-indigo-100 active:scale-[0.98]"
                            >
                                {locLoading ? (
                                    <LoaderCircle className="size-5 animate-spin" />
                                ) : (
                                    <>
                                        <LocateFixed className="size-5" />
                                        {t("locationStep.useCurrentLocation")}
                                    </>
                                )}
                            </button>

                            {locErr !== "" && (
                                <span className='block text-sm text-red-500'>{locErr}</span>
                            )}

                            <div className="flex items-center">
                                <div className="h-px flex-1 bg-zinc-200" />
                                <span className="px-3 text-xs font-medium text-zinc-400">
                                    {t("locationStep.orEnterManually")}
                                </span>
                                <div className="h-px flex-1 bg-zinc-200" />
                            </div>

                            {/* State */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-zinc-700">
                                    {t("locationStep.stateLabel")}
                                </label>

                                <input
                                    list="states-list"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    placeholder={t("locationStep.statePlaceholder")}
                                    className="h-14 w-full rounded-2xl border border-zinc-200 bg-zinc-50 
                                        px-5 text-sm font-medium text-zinc-700 transition-all outline-none
                                        hover:border-green-400 focus:border-green-500 focus:bg-white"
                                />
                                <datalist id="states-list">
                                    {states.map((s) => (
                                        <option key={s} value={s} />
                                    ))}
                                </datalist>
                            </div>

                            {/* District */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-zinc-700">
                                    {t("locationStep.districtLabel")}
                                </label>

                                <input
                                    type="text"
                                    value={district}
                                    onChange={(e) => setDistrict(e.target.value)}
                                    placeholder={t("locationStep.districtPlaceholder")}
                                    className="h-14 w-full rounded-2xl border border-zinc-200 bg-zinc-50 
                                        px-5 text-sm font-medium text-zinc-700 transition-all outline-none
                                        hover:border-green-400 focus:border-green-500 focus:bg-white"
                                />
                            </div>

                        </div>

                        {/* Step 2 buttons: Back + Save */}
                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() => setStep(1)}
                                className="h-14 flex-1 rounded-2xl border border-zinc-200 bg-white
                                    font-semibold text-zinc-600 transition-all cursor-pointer
                                    hover:border-zinc-300 hover:bg-zinc-50 active:scale-[0.98]"
                            >
                                {t("locationStep.back")}
                            </button>

                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="group relative flex h-14 flex-[2] items-center justify-center 
                                    overflow-hidden rounded-2xl cursor-pointer
                                    bg-gradient-to-r from-[#00C950] via-[#16A34A] to-[#15803D]
                                    text-white shadow-xl transition-all duration-300
                                    hover:-translate-y-1 hover:shadow-2xl active:scale-[0.98]
                                    disabled:opacity-70 disabled:hover:translate-y-0"
                            >
                                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r 
                                    from-transparent via-white/20 to-transparent transition-transform
                                    duration-700 group-hover:translate-x-full" />

                                <span className="text-base font-bold tracking-wide flex items-center gap-2">
                                    {saving && <LoaderCircle className="size-4 animate-spin" />}
                                    {saving ? t("locationStep.saving") : t("locationStep.finishSetup")}
                                </span>
                            </button>
                        </div>

                    </div>
                )}

                {/* ================= STEP 3: Success Card ================= */}
                {step === 3 && !checkingUser && (
                    <div className="rounded-3xl border border-green-100 bg-white p-8 shadow-sm text-center">

                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">

                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#00C950] to-[#15803D]">

                                <Check className="size-9 text-white stroke-[3]" />

                            </div>

                        </div>

                        <h2 className="mt-6 text-2xl font-bold text-zinc-900">
                            {t("successStep.title")}
                        </h2>

                        <p className="mt-3 text-zinc-500 leading-7 max-w-sm mx-auto">
                            {t("successStep.description")}
                        </p>

                        <div className="mt-8 flex justify-center">

                            <LoaderCircle className="size-7 animate-spin text-[#00C950]" />

                        </div>

                        <p className="mt-3 text-sm text-zinc-400">
                            {t("successStep.redirecting")}
                        </p>

                    </div>
                )}

            </div>

        </div>
    );
}