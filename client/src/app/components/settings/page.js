"use client"

import { useEffect, useRef, useState } from 'react';
import {
    Home, MapPin, Sprout, Droplets, Ruler, Globe2,
    Check, LogOut, Camera, Pencil, Globe, Save, LocateFixed,
    Wheat, Plus, X,
    LoaderCircle
} from 'lucide-react';
import Heading from '../heading/page'
import { useRouter } from 'next/navigation'
import { reverseGeocode, saveUser, updateUser } from '@/app/services/api';
import { useAuth, useClerk } from '@clerk/nextjs';
import { setAuthToken } from '@/app/lib/setToken';
import { useTranslations } from 'next-intl';
import { changeLocale } from '../LocaleSwitcher';

export default function Page() {

    const t = useTranslations("settings")

    const soilTypes = [
        { value: "Loamy", key: "loamy" },
        { value: "Sandy", key: "sandy" },
        { value: "Clayey", key: "clayey" },
        { value: "Silty", key: "silty" },
        { value: "Black", key: "black" },
        { value: "Red", key: "red" },
    ];
    const waterSourceOptions = [
        { value: "Canal", key: "canal" },
        { value: "Borewell", key: "borewell" },
        { value: "Rainfed", key: "rainfed" },
        { value: "Drip", key: "drip" },
        { value: "Tube well", key: "tubewell" },
    ];
    const commonCrops = [
        { value: "Wheat", key: "wheat" },
        { value: "Rice", key: "rice" },
        { value: "Maize", key: "maize" },
        { value: "Sugarcane", key: "sugarcane" },
        { value: "Cotton", key: "cotton" },
        { value: "Potato", key: "potato" },
        { value: "Pulses", key: "pulses" },
        { value: "Mustard", key: "mustard" },
    ];
    const languages = [
        { value: "English", key: "english" },
        { value: "Hindi", key: "hindi" },
        { value: "Marathi", key: "marathi" },
        { value: "Kannada", key: "kannada" },
        { value: "Tamil", key: "tamil" },
        { value: "Telugu", key: "telugu" },
        { value: "Bengali", key: "bengali" },
    ];
    const states = ["Uttar Pradesh", "Bihar", "Punjab", "Maharashtra", "Karnataka"];

    const dummyUrl = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=256&h=256&auto=format&fit=crop"

    const router = useRouter()
    const { getToken } = useAuth()

    const [name, setName] = useState("");
    const [state, setState] = useState("");
    const [district, setDistrict] = useState("");
    const [soilType, setSoilType] = useState("Clayey");
    const [waterSources, setWaterSources] = useState(["Canal"]);
    const [farmSize, setFarmSize] = useState("1");
    const [language, setLanguage] = useState("English");
    const [previousCrops, setPreviousCrops] = useState(["Wheat", "Rice"]);
    const [customCrop, setCustomCrop] = useState("")
    const [backendImageUrl, setBackendImageUrl] = useState(dummyUrl)
    const [image, setImage] = useState(null)
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")

    const [locLoading, setLocLoading] = useState(false)
    const [locErr, setLocErr] = useState("")

    const [saving, setSaving] = useState(false)

    const { signOut } = useClerk()


    const handleLogout = () => {
        signOut({
            redirectUrl: "/"
        })
    }
    const handleImage = (e) => {

        const file = e.target.files[0]

        if (!file) return;

        setImage(file)
    }

    const handleUseCurrentLocation = () => {
        if (!navigator.geolocation) {
            setLocErr(t("location.errors.geoNotSupported"))
            return
        }

        setLocLoading(true)
        setLocErr("")

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords

                const result = await reverseGeocode(latitude, longitude)

                // console.log(result)

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
                        setLocErr(t("location.errors.permissionDenied"))
                        break
                    case error.POSITION_UNAVAILABLE:
                        setLocErr(t("location.errors.positionUnavailable"))
                        break
                    case error.TIMEOUT:
                        setLocErr(t("location.errors.timeout"))
                        break
                    default:
                        setLocErr(t("location.errors.unknown"))
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        )
    };

    const toggleWaterSource = (source) => {
        setWaterSources((prev) =>
            prev.includes(source) ? prev.filter((s) => s !== source) : [...prev, source]
        );
    };

    const toggleCrop = (crop) => {
        setPreviousCrops((prev) =>
            prev.includes(crop) ? prev.filter((c) => c !== crop) : [...prev, crop]
        );
    };

    const addCustomCrop = () => {
        const trimmed = customCrop.trim();
        if (!trimmed || previousCrops.includes(trimmed)) return;
        setPreviousCrops((prev) => [...prev, trimmed]);
        setCustomCrop("");
    };

    const handleSave = async () => {
        const form = new FormData()

        form.append("name", name)
        form.append("state", state)
        form.append("district", district)
        form.append("lat", latitude)
        form.append("lng", longitude)
        form.append("soilType", soilType)
        form.append("farmSize", farmSize)
        form.append("waterSources", JSON.stringify(waterSources))
        form.append("previousCrops", JSON.stringify(previousCrops))
        form.append("language", language)
        if (image) form.append("image", image)


        setSaving(true)
        const result = await updateUser(form)

        if (result.success && result.user) {
            const { user } = result

            setName(user.name);
            setState(user.state ?? "");
            setDistrict(user.district ?? "");
            setLanguage(user.language);

            setFarmSize(String(user.myFarm?.farmSize ?? "1"));
            setWaterSources(user.myFarm?.waterSources ?? []);
            setSoilType(user.myFarm?.soilType ?? "Clayey");
            setPreviousCrops(user.myFarm?.previousCrops ?? []);

            setBackendImageUrl(user.image ?? dummyUrl);

            setLatitude(user.lat ?? "");
            setLongitude(user.lng ?? "");

            changeLocale(user.language,router)

        }

        setSaving(false)
    }

    // fetch user
    useEffect(() => {
        async function init() {
            try {
                const token = await getToken();

                setAuthToken(token);

                const res = await saveUser();

                if (res.success && res.user) {
                    const { user } = res

                    setName(user.name ?? "Farmer");
                    setState(user.state ?? "");
                    setDistrict(user.district ?? "");
                    setLanguage(user.language ?? "English");

                    setFarmSize(String(user.myFarm?.farmSize ?? "1"));
                    setWaterSources(user.myFarm?.waterSources ?? []);
                    setSoilType(user.myFarm?.soilType ?? "Clayey");
                    setPreviousCrops(user.myFarm?.previousCrops ?? []);

                    setBackendImageUrl(user.image ?? dummyUrl);

                    setLatitude(user.lat ?? "");
                    setLongitude(user.lng ?? "");

                    if (user?.language) {
                        changeLocale(user.language,router)
                    }

                }


            } catch (err) {
                console.error("Failed to initialise settings:", err);
            }
        }

        init();
    }, [])

    return (
        <div className="min-h-screen w-full bg-[linear-gradient(180deg,#F6FAF6_0%,#FAFAF7_100%)]">

            {/* Header */}
            <div className='sticky top-0 z-[9999]'>
                <Heading name={t("title")} desc={t("subtitle")} />
            </div>

            <button
                onClick={() => router.push("/components/dashboard")}
                className="z-[99999] absolute top-[15px] right-2 cursor-pointer size-11 lg:size-12 
            rounded-full bg-green-600 shadow-sm flex items-center justify-center">
                <Home className="size-5 lg:size-6 text-white" />
            </button>


            <div className="mx-auto max-w-3xl space-y-4 p-4 sm:p-5 lg:space-y-6 lg:p-8">

                {/* Profile Card */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#E8F5E9] via-[#C8E6C9] to-[#81C784] p-6 lg:p-8 shadow-xl">

                    <div className="absolute -top-10 -right-10 h-36 w-36 rounded-full bg-white/20 blur-2xl"></div>
                    <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-green-300/30 blur-3xl"></div>

                    <div className="relative flex flex-col items-center">

                        <div className="relative mb-5">
                            <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg lg:h-28 lg:w-28">
                                <img
                                    src={image ? URL.createObjectURL(image) : backendImageUrl}
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <label
                                htmlFor='profileImage'
                                className="absolute bottom-0 right-0 flex h-9 w-9 items-center 
                                justify-center rounded-full border-2 border-white bg-[#00C950]
                                cursor-pointer
                                text-white shadow-md transition active:scale-90 hover:bg-green-700"
                            >
                                <Camera className="size-4" />
                            </label>

                            <input
                                id="profileImage"
                                type="file" accept='image/*' hidden
                                onChange={handleImage} />


                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                id="nameBox"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-44 sm:w-56 bg-transparent text-center text-2xl 
                                font-bold text-[#1B4332] outline-none placeholder:text-green-700"
                            />
                            <label
                                htmlFor='nameBox'
                                className="flex h-9 w-9 items-center justify-center rounded-full
                                 bg-white text-green-700 shadow-sm transition hover:bg-green-50
                                 cursor-pointer active:scale-90"
                            >
                                <Pencil className="size-4" />
                            </label>
                        </div>
                        <p className="mt-2 text-center text-sm font-medium text-green-900/80">
                            {t("profile.assistantName")}
                        </p>
                    </div>
                </div>


                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                    {/* ================= Location ================= */}

                    <div className="group rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                        <div className="mb-6 flex items-center gap-4">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-lg">
                                <MapPin className="size-7" />
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-zinc-900">
                                    {t("location.title")}
                                </h3>
                                <p className="text-sm text-zinc-500">
                                    {t("location.description")}
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
                                {locLoading ? <LoaderCircle className="size-5 animate-spin" /> :
                                    <><LocateFixed className="size-5" />
                                        {t("location.useCurrentLocation")}
                                    </>
                                }

                            </button>

                            {locErr !== "" ? <span className='text-sm text-red-400'>{locErr}</span> : null}

                            <div className="flex items-center">
                                <div className="h-px flex-1 bg-zinc-200" />
                                <span className="px-3 text-xs font-medium text-zinc-400">
                                    {t("location.manualEntry")}
                                </span>
                                <div className="h-px flex-1 bg-zinc-200" />
                            </div>

                            {/* State — select from dropdown OR type */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-zinc-700">
                                    {t("location.state")}
                                </label>

                                <input
                                    list="states-list"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    placeholder={t("location.statePlaceholder")}
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

                            {/* District*/}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-zinc-700">
                                    {t("location.district")}
                                </label>

                                <input
                                    type="text"
                                    value={district}
                                    onChange={(e) => setDistrict(e.target.value)}
                                    placeholder={t("location.districtPlaceholder")}
                                    className="h-14 w-full rounded-2xl border border-zinc-200 bg-zinc-50 
                                    px-5 text-sm font-medium text-zinc-700 transition-all outline-none
                                     hover:border-green-400 focus:border-green-500 focus:bg-white"
                                />
                            </div>

                        </div>

                    </div>

                    {/* ================= Soil ================= */}

                    <div
                        className="group rounded-3xl border border-zinc-200 bg-white p-6
                     shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <div className="mb-6 flex items-center gap-4">

                            <div
                                className="flex h-14 w-14 items-center justify-center 
                            rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500
                             text-white shadow-lg">
                                <Sprout className="size-7" />
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-zinc-900">
                                    {t("soil.title")}
                                </h3>
                                <p className="text-sm text-zinc-500">
                                    {t("soil.description")}
                                </p>
                            </div>

                        </div>

                        <div className="flex flex-wrap gap-3">
                            {soilTypes.map((type) => (
                                <button
                                    key={type.value}
                                    onClick={() => setSoilType(type.value)}
                                    className={`rounded-2xl border px-5 py-3 text-sm font-semibold transition-all 
                                        cursor-pointer duration-300 active:scale-95
                    ${soilType === type.value
                                            ? "border-green-600 bg-green-600 text-white shadow-lg"
                                            : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-green-400 hover:bg-green-50 hover:text-green-700"
                                        }`}
                                >
                                    🌱 {t(`soil.types.${type.key}`)}
                                </button>
                            ))}
                        </div>

                    </div>

                    {/* ================= Water Source ================= */}

                    <div
                        className="group rounded-3xl border border-zinc-200 bg-white p-6 
                    shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <div className="mb-6 flex items-center gap-4">

                            <div
                                className="flex h-14 w-14 items-center justify-center rounded-2xl
                             bg-gradient-to-br from-cyan-400 to-teal-500 text-white shadow-lg">
                                <Droplets className="size-7" />
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-zinc-900">
                                    {t("water.title")}
                                </h3>
                                <p className="text-sm text-zinc-500">
                                    {t("water.description")}
                                </p>
                            </div>

                        </div>

                        <div className="flex flex-wrap gap-3">
                            {waterSourceOptions.map((source) => (
                                <button
                                    key={source.value}
                                    onClick={() => toggleWaterSource(source.value)}
                                    className={`rounded-2xl border px-5 py-3 text-sm font-semibold transition-all 
                                        duration-300 active:scale-95 cursor-pointer
                    ${waterSources.includes(source.value)
                                            ? "border-cyan-600 bg-cyan-600 text-white shadow-lg"
                                            : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-700"
                                        }`}
                                >
                                    💧 {t(`water.sources.${source.key}`)}
                                </button>
                            ))}
                        </div>

                    </div>

                    {/* ================= Farm Size ================= */}

                    <div
                        className="group rounded-3xl border border-zinc-200 bg-white p-6
                     shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <div className="mb-6 flex items-center gap-4">

                            <div
                                className="flex h-14 w-14 items-center justify-center rounded-2xl
                             bg-gradient-to-br from-violet-400 to-purple-600 text-white shadow-lg">
                                <Ruler className="size-7" />
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-zinc-900">
                                    {t("farmSize.title")}
                                </h3>
                                <p className="text-sm text-zinc-500">
                                    {t("farmSize.description")}
                                </p>
                            </div>

                        </div>

                        <div className="relative">
                            <input
                                type="number"
                                min="0"
                                step="0.1"
                                value={farmSize}
                                onChange={(e) => setFarmSize(e.target.value)}
                                placeholder={t("farmSize.placeholder")}
                                className="h-14 w-full rounded-2xl border border-zinc-200 bg-zinc-50
                                px-5 pr-20 text-sm font-medium text-zinc-700 transition-all 
                                outline-none hover:border-green-400 focus:border-green-500 focus:bg-white"
                            />
                            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm
                             font-semibold text-zinc-400">
                                {t("farmSize.unit")}
                            </span>
                        </div>

                    </div>

                    {/* ================= Previous Crops ================= */}

                    <div
                        className="group rounded-3xl border border-zinc-200 bg-white p-6
                     shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:col-span-2">
                        <div className="mb-6 flex items-center gap-4">

                            <div
                                className="flex h-14 w-14 items-center justify-center rounded-2xl
                             bg-gradient-to-br from-lime-400 to-green-600 text-white shadow-lg">
                                <Wheat className="size-7" />
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-zinc-900">
                                    {t("previousCrops.title")}
                                </h3>
                                <p className="text-sm text-zinc-500">
                                    {t("previousCrops.description")}
                                </p>
                            </div>

                        </div>

                        {/* Selected crops as removable chips */}
                        {previousCrops.length > 0 && (
                            <div className="mb-4 flex flex-wrap gap-2">
                                {previousCrops.map((crop) => {
                                    const known = commonCrops.find((c) => c.value === crop);
                                    return (
                                        <span
                                            key={crop}
                                            className="flex items-center gap-1.5 rounded-full bg-green-600 text-white px-4 py-2 text-sm font-semibold shadow-sm"
                                        >
                                            🌾 {known ? t(`previousCrops.common.${known.key}`) : crop}
                                            <X
                                                className="size-3.5 cursor-pointer opacity-80 hover:opacity-100"
                                                onClick={() => toggleCrop(crop)}
                                            />
                                        </span>
                                    );
                                })}
                            </div>
                        )}

                        {/* Common crop quick-add chips */}
                        <div className="flex flex-wrap gap-3 mb-4">
                            {commonCrops
                                .filter((c) => !previousCrops.includes(c.value))
                                .map((crop) => (
                                    <button
                                        key={crop.value}
                                        onClick={() => toggleCrop(crop.value)}
                                        className="rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-3 text-sm 
                                        font-semibold text-zinc-700 transition-all duration-300 active:scale-95
                                        cursor-pointer hover:border-green-400 hover:bg-green-50 hover:text-green-700"
                                    >
                                        + {t(`previousCrops.common.${crop.key}`)}
                                    </button>
                                ))}
                        </div>

                        {/* Custom crop input */}
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={customCrop}
                                onChange={(e) => setCustomCrop(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && addCustomCrop()}
                                placeholder={t("previousCrops.placeholder")}
                                className="h-12 flex-1 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm font-medium text-zinc-700 outline-none transition-all hover:border-green-400 focus:border-green-500 focus:bg-white"
                            />
                            <button
                                onClick={addCustomCrop}
                                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-600 text-white shadow-sm transition hover:bg-green-700 active:scale-95"
                            >
                                <Plus className="size-5" />
                            </button>
                        </div>

                    </div>

                </div>

                {/* Language Card */}

                <div
                    className="rounded-3xl border border-zinc-200 bg-white p-6 
                shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                    <div className="mb-6 flex items-center gap-4">

                        <div
                            className="flex h-14 w-14 items-center justify-center
                         rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600
                          text-white shadow-lg">
                            <Globe className="size-7" />
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-zinc-900">
                                {t("language.title")}
                            </h3>
                            <p className="text-sm text-zinc-500">
                                {t("language.description")}
                            </p>
                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                        {languages.map((lang) => {
                            const active = language === lang.value;
                            return (
                                <button
                                    key={lang.value}
                                    onClick={() => setLanguage(lang.value)}
                                    className={`relative flex flex-col items-center justify-center
                                        cursor-pointer
                                                rounded-2xl border p-4 transition-all duration-300 
                                                active:scale-95 ${active
                                            ? "border-green-600 bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg"
                                            : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-green-400 hover:bg-green-50 hover:shadow-md"
                                        }
                                     `}
                                >
                                    {active && (
                                        <div
                                            className="absolute right-2 top-2 flex h-5 w-5 
                                        items-center justify-center rounded-full bg-white
                                         text-green-600">
                                            <Check className="size-3 stroke-[3]" />
                                        </div>
                                    )}
                                    <Globe2 className="mb-2 size-6" />
                                    <span className="text-sm font-semibold">
                                        {t(`language.options.${lang.key}`)}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Action Buttons */}

                <div className="mt-2 space-y-4">

                    <button
                        onClick={handleSave}
                        className="group relative flex h-16 w-full items-center justify-center 
                        overflow-hidden rounded-3xl
                        bg-gradient-to-r from-[#00C950] via-[#16A34A] to-[#15803D]
                        text-white shadow-xl transition-all duration-300 cursor-pointer
                        hover:-translate-y-1 hover:shadow-2xl active:scale-[0.98]">

                        <span
                            className="absolute inset-0 -translate-x-full bg-gradient-to-r 
                        from-transparent via-white/20 to-transparent transition-transform
                         duration-700 group-hover:translate-x-full"></span>

                        <Save className="mr-3 size-5" />

                        <span className={`text-lg font-bold tracking-wide ${saving ? "cursor-not-allowed" : ""}`}>
                            {saving ? t("buttons.saving") : t("buttons.save")}
                        </span>

                    </button>

                    <div className="grid grid-cols-2 gap-4">

                        <button
                            onClick={() => router.push("/components/dashboard")}
                            className="group flex h-14 items-center justify-center gap-3 rounded-3xl
                                       border border-green-100 bg-white font-semibold text-green-700
                                        shadow-sm transition-all duration-300 hover:-translate-y-1
                                        cursor-pointer hover:border-green-400 hover:bg-green-50 
                                        hover:shadow-lg  active:scale-[0.98]"
                        >
                            <div
                                className="rounded-xl bg-green-100 p-2 transition-colors
                              group-hover:bg-green-600">
                                <Home className="size-5 group-hover:text-white" />
                            </div>
                            <span>{t("buttons.home")}</span>
                        </button>

                        <button
                            onClick={handleLogout}
                            className="group flex h-14 items-center justify-center gap-3 rounded-3xl
                                      border border-red-100 bg-white font-semibold text-red-600 shadow-sm
                                     transition-all duration-300 hover:-translate-y-1 hover:border-red-300
                                      hover:bg-red-50 hover:shadow-lg active:scale-[0.98] cursor-pointer"
                        >
                            <div className="rounded-xl bg-red-100 p-2 transition-colors group-hover:bg-red-600">
                                <LogOut className="size-5 group-hover:text-white" />
                            </div>
                            <span>{t("buttons.logout")}</span>
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}