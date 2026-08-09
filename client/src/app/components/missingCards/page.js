
"use client"

import { useState } from 'react';
import { Sprout, Droplets, Ruler, Wheat, Plus, X, Save, LoaderCircle, SkipForward } from 'lucide-react';
import { updateUser } from '@/app/services/api';
import { useTranslations } from 'next-intl';

export default function MissingCards({ missingInfo, setMissingInfo }) {

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

    const [soilType, setSoilType] = useState("");
    const [waterSources, setWaterSources] = useState([]);
    const [previousCrops, setPreviousCrops] = useState([]);
    const [customCrop, setCustomCrop] = useState("");
    const [farmSize, setFarmSize] = useState("");

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const needs = (field) => missingInfo.includes(field);

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

    const isValid = () => {
        if (needs("soil_type") && !soilType) return false;
        if (needs("water_sources") && waterSources.length === 0) return false;
        if (needs("previous_crops") && previousCrops.length === 0) return false;
        if (needs("farm_size") && (!farmSize || Number(farmSize) <= 0)) return false;
        return true;
    };

    const handleSubmit = async () => {
        if (!isValid()) {
            setError(t("missingCard.errorRequired"));
            return;
        }
        setError("");
        setSaving(true);

        const form = new FormData();
        if (needs("soil_type")) form.append("soilType", soilType);
        if (needs("water_sources")) form.append("waterSources", JSON.stringify(waterSources));
        if (needs("previous_crops")) form.append("previousCrops", JSON.stringify(previousCrops));
        if (needs("farm_size")) form.append("farmSize", farmSize);

            const result = await updateUser(form);

            if (result.success) {
                setMissingInfo([]);
            } else {
                setError(t("missingCard.errorSaveFailed"));
            }

        setSaving(false);
    };

    const handleSkip = () => {
        setMissingInfo([]);
    };

    if (!missingInfo || missingInfo.length === 0) return null;

    let renderedIndex = 0;
    const withDivider = (content) => {
        renderedIndex += 1;
        return (
            <>
                {renderedIndex > 1 && <div className="h-px bg-zinc-100" />}
                {content}
            </>
        );
    };

    return (
        <div className="mx-auto mt-4 max-w-3xl space-y-4 px-4">

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm font-semibold text-amber-800">
                    {t("settings.banner")}
                </p>
            </div>

            {/* One shared container — sections separated by dividers, not separate boxes */}
            <div className="rounded-3xl border border-zinc-200 bg-white shadow-sm overflow-hidden">

                {needs("soil_type") && withDivider(
                    <div className="p-6">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg">
                                <Sprout className="size-5" />
                            </div>
                            <h3 className="text-base font-bold text-zinc-900">{t("soil.title")}</h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {soilTypes.map((type) => (
                                <button
                                    key={type.value}
                                    onClick={() => setSoilType(type.value)}
                                    className={`rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-all duration-300 active:scale-95
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
                )}

                {needs("water_sources") && withDivider(
                    <div className="p-6">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-teal-500 text-white shadow-lg">
                                <Droplets className="size-5" />
                            </div>
                            <h3 className="text-base font-bold text-zinc-900">{t("water.title")}</h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {waterSourceOptions.map((source) => (
                                <button
                                    key={source.value}
                                    onClick={() => toggleWaterSource(source.value)}
                                    className={`rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-all duration-300 active:scale-95
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
                )}

                {needs("farm_size") && withDivider(
                    <div className="p-6">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 text-white shadow-lg">
                                <Ruler className="size-5" />
                            </div>
                            <h3 className="text-base font-bold text-zinc-900">{t("farmSize.title")}</h3>
                        </div>
                        <div className="relative">
                            <input
                                type="number"
                                min="0"
                                step="0.1"
                                value={farmSize}
                                onChange={(e) => setFarmSize(e.target.value)}
                                placeholder={t("farmSize.placeholder")}
                                className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 pr-20 text-sm font-medium text-zinc-700 outline-none transition-all hover:border-green-400 focus:border-green-500 focus:bg-white"
                            />
                            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-semibold text-zinc-400">
                                {t("farmSize.unit")}
                            </span>
                        </div>
                    </div>
                )}

                {needs("previous_crops") && withDivider(
                    <div className="p-6">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-lime-400 to-green-600 text-white shadow-lg">
                                <Wheat className="size-5" />
                            </div>
                            <h3 className="text-base font-bold text-zinc-900">{t("previousCrops.title")}</h3>
                        </div>

                        {previousCrops.length > 0 && (
                            <div className="mb-4 flex flex-wrap gap-2">
                                {previousCrops.map((crop) => {
                                    const known = commonCrops.find((c) => c.value === crop);
                                    return (
                                        <span
                                            key={crop}
                                            className="flex items-center gap-1.5 rounded-full bg-green-600 text-white px-3.5 py-1.5 text-sm font-semibold shadow-sm"
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

                        <div className="mb-4 flex flex-wrap gap-3">
                            {commonCrops
                                .filter((c) => !previousCrops.includes(c.value))
                                .map((crop) => (
                                    <button
                                        key={crop.value}
                                        onClick={() => toggleCrop(crop.value)}
                                        className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm font-semibold text-zinc-700 transition-all duration-300 active:scale-95 hover:border-green-400 hover:bg-green-50 hover:text-green-700"
                                    >
                                        + {t(`previousCrops.common.${crop.key}`)}
                                    </button>
                                ))}
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={customCrop}
                                onChange={(e) => setCustomCrop(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && addCustomCrop()}
                                placeholder={t("previousCrops.placeholder")}
                                className="h-11 flex-1 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm font-medium text-zinc-700 outline-none transition-all hover:border-green-400 focus:border-green-500 focus:bg-white"
                            />
                            <button
                                onClick={addCustomCrop}
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-600 text-white shadow-sm transition hover:bg-green-700 active:scale-95"
                            >
                                <Plus className="size-5" />
                            </button>
                        </div>

                        <div className="flex mt-3 gap-3">

                <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="flex h-14 flex-1 items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-[#00C950] via-[#16A34A] to-[#15803D] text-white font-bold shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-[0.98] disabled:opacity-70"
                >
                    {saving ? <LoaderCircle className="size-5 animate-spin" /> : <Save className="size-5" />}
                    {saving ? t("missingCard.saving") : t("missingCard.saveContinue")}
                </button>
                
                <button
                    onClick={handleSkip}
                    disabled={saving}
                    className="flex h-14 items-center justify-center gap-2 rounded-3xl border border-zinc-200 bg-white px-6 text-zinc-500 font-semibold transition-all duration-300 hover:border-zinc-300 hover:bg-zinc-50 active:scale-[0.98] disabled:opacity-50"
                >
                    <SkipForward className="size-4" />
                    {t("missingCard.skip")}
                </button>

            </div>


                    </div>
                )}

            </div>

            {error && <p className="text-sm font-medium text-red-500">{error}</p>}

            

        </div>
    );
}