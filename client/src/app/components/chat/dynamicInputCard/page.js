// "use client";

// import { useState } from "react";
// import { Plus, X } from "lucide-react";
// import { useTranslations } from "next-intl";

// export default function DynamicInputCard({
//     data,
//     setData,
//     onContinue,
// }) {

//     const t = useTranslations("dynamicInput")

//     const crops = t.raw("crops")
//     const seasons = t.raw("seasons")

//     const [customCrop, setCustomCrop] = useState("");

//     const toggleCrop = (crop) => {

//         const alreadySelected = data.crops.includes(crop);

//         if (alreadySelected) {

//             setData(prev => ({
//                 ...prev,
//                 crops: prev.crops.filter(c => c !== crop),
//             }));

//         } else {

//             setData(prev => ({
//                 ...prev,
//                 crops: [...prev.crops, crop],
//             }));

//         }

//     };

//     const addCustomCrop = () => {
//         const trimmed = customCrop.trim();
//         if (!trimmed || data.crops.includes(trimmed)) return;

//         setData(prev => ({
//             ...prev,
//             crops: [...prev.crops, trimmed],
//         }));
//         setCustomCrop("");
//     };

   
//     const customSelectedCrops = data.crops.filter((c) => !crops.includes(c));

//     return (

//         <div className="mx-auto w-full max-w-xl rounded-3xl border mt-3 border-zinc-200 bg-white p-6 shadow-sm">

//             {/* Season */}

//             <div className="mt-1">

//                 <h3 className="mb-3 font-semibold text-zinc-800">
//                    {t("seasonTitle")}
//                 </h3>

//                 <div className="flex flex-wrap gap-2">

//                     {seasons.map((season) => {

//                         const active = data.season === season;

//                         return (

//                             <button
//                                 key={season}
//                                 onClick={() =>
//                                     setData(prev => ({
//                                         ...prev,
//                                         season,
//                                     }))
//                                 }
//                                 className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300

//                                 ${active
//                                         ? "bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-md"
//                                         : "border border-zinc-200 bg-white text-zinc-700 hover:border-[#00c950]"
//                                     }`}
//                             >
//                                 {season}
//                             </button>

//                         );

//                     })}

//                 </div>

//             </div>

//             {/*Crops */}

//             <div className="mt-4">

//                 <h3 className="mb-3 font-semibold text-zinc-800">
//                     {t("cropTitle")}
//                 </h3>

//                 {/* Custom crops the farmer typed in — shown as removable chips, ahead of the presets */}
//                 {customSelectedCrops.length > 0 && (
//                     <div className="mb-2 flex flex-wrap gap-2">
//                         {customSelectedCrops.map((crop) => (
//                             <span
//                                 key={crop}
//                                 className="flex items-center gap-1.5 rounded-full bg-gradient-to-br from-emerald-400
//                                  to-green-600 px-4 py-2 text-sm font-medium text-white shadow-md"
//                             >
//                                 {crop}
//                                 <X
//                                     className="size-3.5 cursor-pointer opacity-80 hover:opacity-100"
//                                     onClick={() => toggleCrop(crop)}
//                                 />
//                             </span>
//                         ))}
//                     </div>
//                 )}

//                 <div className="flex flex-wrap gap-2">

//                     {crops.map((crop) => (

//                         <button key={crop}

//                             onClick={() => toggleCrop(crop)}
//                             className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300

//                                 ${data.crops.includes(crop)
//                                     ? "bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-md"
//                                     : "border border-zinc-200 bg-white text-zinc-700 hover:border-[#00c950]"
//                                 }`}
//                         >
//                             {crop}
//                         </button>

//                     )
//                     )}

//                 </div>

//                 {/* Custom crop input */}
//                 <div className="mt-3 flex gap-2">
//                     <input
//                         type="text"
//                         value={customCrop}
//                         onChange={(e) => setCustomCrop(e.target.value)}
//                         onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomCrop())}
//                         placeholder={t("customCropPlaceholder")}
//                         className="h-11 flex-1 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm font-medium text-zinc-700 outline-none transition-all hover:border-green-400 focus:border-green-500 focus:bg-white"
//                     />
//                     <button
//                         onClick={addCustomCrop}
//                         className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-600 text-white shadow-sm transition hover:bg-green-700 active:scale-95"
//                     >
//                         <Plus className="size-5" />
//                     </button>
//                 </div>

//             </div>

//             {/* Continue */}

//             <button
//                 onClick={onContinue}
//                 className={`mt-10 w-full rounded-2xl bg-gradient-to-br from-emerald-400
//                  to-green-600 py-3 text-base font-semibold text-white shadow-lg
//                  shadow-green-200 transition hover:scale-[1.01] active:scale-95
//                  ${data.season && data.crops.length > 0 ? "" : "cursor-not-allowed bg-gradient-to-br from-emerald-100 to-green-200"}`}
//             >
//                {t("continue")}
//             </button>

//         </div>

//     );

// }

"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useTranslations } from "next-intl";

// static English labels — never change with locale, used for backend values
const CROP_EN_LABELS = {
    rice: "Rice",
    wheat: "Wheat",
    maize: "Maize",
    cotton: "Cotton",
    sugarcane: "Sugarcane",
    potato: "Potato",
    tomato: "Tomato",
    onion: "Onion",
    none: "None",
};

const SEASON_EN_LABELS = {
    kharif: "Kharif",
    rabi: "Rabi",
    zaid: "Zaid",
};

export default function DynamicInputCard({
    data,
    setData,
    onContinue,
}) {

    const t = useTranslations("dynamicInput")

    const cropKeys = Object.keys(CROP_EN_LABELS);
    const seasonKeys = Object.keys(SEASON_EN_LABELS);

    const [customCrop, setCustomCrop] = useState("");

    const toggleCrop = (englishCrop) => {

        const alreadySelected = data.crops.includes(englishCrop);

        if (alreadySelected) {

            setData(prev => ({
                ...prev,
                crops: prev.crops.filter(c => c !== englishCrop),
            }));

        } else {

            setData(prev => ({
                ...prev,
                crops: [...prev.crops, englishCrop],
            }));

        }

    };

    const addCustomCrop = () => {
        const trimmed = customCrop.trim();
        if (!trimmed || data.crops.includes(trimmed)) return;

        setData(prev => ({
            ...prev,
            crops: [...prev.crops, trimmed],
        }));
        setCustomCrop("");
    };

    // crops the farmer typed manually — not part of our known list
    const knownEnglishCrops = Object.values(CROP_EN_LABELS);
    const customSelectedCrops = data.crops.filter((c) => !knownEnglishCrops.includes(c));

    return (

        <div className="mx-auto w-full max-w-xl rounded-3xl border mt-3 border-zinc-200 bg-white p-6 shadow-sm">

            {/* Season */}

            <div className="mt-1">

                <h3 className="mb-3 font-semibold text-zinc-800">
                   {t("seasonTitle")}
                </h3>

                <div className="flex flex-wrap gap-2">

                    {seasonKeys.map((key) => {

                        const englishSeason = SEASON_EN_LABELS[key];
                        const active = data.season === englishSeason;

                        return (

                            <button
                                key={key}
                                onClick={() =>
                                    setData(prev => ({
                                        ...prev,
                                        season: englishSeason,
                                    }))
                                }
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300

                                ${active
                                        ? "bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-md"
                                        : "border border-zinc-200 bg-white text-zinc-700 hover:border-[#00c950]"
                                    }`}
                            >
                                {t(`seasons.${key}`)}
                            </button>

                        );

                    })}

                </div>

            </div>

            {/*Crops */}

            <div className="mt-4">

                <h3 className="mb-3 font-semibold text-zinc-800">
                    {t("cropTitle")}
                </h3>

                {/* Custom crops the farmer typed in — shown as removable chips, ahead of the presets */}
                {customSelectedCrops.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-2">
                        {customSelectedCrops.map((crop) => (
                            <span
                                key={crop}
                                className="flex items-center gap-1.5 rounded-full bg-gradient-to-br from-emerald-400
                                 to-green-600 px-4 py-2 text-sm font-medium text-white shadow-md"
                            >
                                {crop}
                                <X
                                    className="size-3.5 cursor-pointer opacity-80 hover:opacity-100"
                                    onClick={() => toggleCrop(crop)}
                                />
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex flex-wrap gap-2">

                    {cropKeys.map((key) => {

                        const englishCrop = CROP_EN_LABELS[key];

                        return (
                            <button key={key}

                                onClick={() => toggleCrop(englishCrop)}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300

                                    ${data.crops.includes(englishCrop)
                                        ? "bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-md"
                                        : "border border-zinc-200 bg-white text-zinc-700 hover:border-[#00c950]"
                                    }`}
                            >
                                {t(`crops.${key}`)}
                            </button>
                        );

                    })}

                </div>

                {/* Custom crop input */}
                <div className="mt-3 flex gap-2">
                    <input
                        type="text"
                        value={customCrop}
                        onChange={(e) => setCustomCrop(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomCrop())}
                        placeholder={t("customCropPlaceholder")}
                        className="h-11 flex-1 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm font-medium text-zinc-700 outline-none transition-all hover:border-green-400 focus:border-green-500 focus:bg-white"
                    />
                    <button
                        onClick={addCustomCrop}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-600 text-white shadow-sm transition hover:bg-green-700 active:scale-95"
                    >
                        <Plus className="size-5" />
                    </button>
                </div>

            </div>

            {/* Continue */}

            <button
                onClick={onContinue}
                className={`mt-10 w-full rounded-2xl bg-gradient-to-br from-emerald-400
                 to-green-600 py-3 text-base font-semibold text-white shadow-lg
                 shadow-green-200 transition hover:scale-[1.01] active:scale-95
                 ${data.season && data.crops.length > 0 ? "" : "cursor-not-allowed bg-gradient-to-br from-emerald-100 to-green-200"}`}
            >
               {t("continue")}
            </button>

        </div>

    );

}