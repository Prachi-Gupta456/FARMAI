"use client"
import { getWeatherInfo } from "@/app/lib/weatherCode";
import { useTranslations } from "next-intl";

function WeatherCard({ weatherData }) {
    if (!weatherData) return null;

    const { current, daily } = weatherData;
    const { label: condition, icon: ConditionIcon } = getWeatherInfo(current.weather_code);
    const t = useTranslations("weatherCard")

    const dayLabel = (isoDate, idx) => {
        if (idx === 0) return "Today";
        return new Date(isoDate).toLocaleDateString("en-US", { weekday: "short" });
    };

    return (
        <div
            className="group relative overflow-hidden rounded-3xl border-2
         border-green-200 bg-gradient-to-br
         from-green-100 via-emerald-50 to-green-100 p-5 shadow-lg 
         transition-shadow duration-500 hover:shadow-2xl hover:shadow-green-300/50">

            <div
                className="absolute -right-10 -top-10 h-40 w-40 rounded-full
             bg-green-300/50 blur-3xl transition-all duration-700 group-hover:scale-125
              group-hover:bg-green-400/50" />
            <div
                className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full
              bg-emerald-300/40 blur-3xl" />
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.5]"
                style={{
                    backgroundImage: "radial-gradient(circle, #00c95030 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                }}
            />

            <div className="relative flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-1.5">
                        <span className="relative flex size-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                            <span className="relative inline-flex size-2 rounded-full bg-green-600" />
                        </span>
                        <p className="text-xs font-bold uppercase tracking-wider text-green-800">
                            {t("live")} · {t("todayWeather")}
                        </p>
                    </div>

                    <h2 className="mt-2 bg-gradient-to-br from-green-900 to-green-700 bg-clip-text text-5xl font-black text-transparent">
                        {Math.round(current.temperature_2m)}°
                    </h2>

                    <p className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-green-800/80">
                        {condition}
                        <span className="text-green-400">•</span>
                        <span className="text-blue-600">
                            {t("rainChance")} {daily.precipitation_probability_max[0]}%
                        </span>
                    </p>
                </div>

                <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-yellow-400 to-orange-400 text-white shadow-xl shadow-orange-300/50 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-105">
                    <ConditionIcon className="size-8 drop-shadow-sm" />
                    <div className="absolute inset-0 rounded-3xl bg-white/20 blur-md" />
                </div>
            </div>

            <div className="relative mt-5 flex flex-wrap gap-2">
                {[
                    { icon: "🌡️", label: `${Math.round(current.temperature_2m)}°C` },
                    { icon: "💧", label: `${current.relative_humidity_2m}%` },
                    { icon: "🌬️", label: `${current.wind_speed_10m} km/h` },
                    { icon: "🌧️", label: `${current.precipitation} mm` },
                ].map((chip) => (
                    <span
                        key={chip.label}
                        className="flex items-center gap-1.5 rounded-full border border-green-300 bg-green-50/90 px-4 py-2 text-sm font-semibold text-green-900 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-green-500 hover:bg-green-100 hover:shadow-md"
                    >
                        {chip.icon} {chip.label}
                    </span>
                ))}
            </div>

            <div className="relative mt-6 grid grid-cols-5 gap-2">
                {daily.time.map((isoDate, idx) => {
                    const { icon: DayIcon } = getWeatherInfo(

                        idx === 0 ? current.weather_code : undefined
                    );
                    const active = idx === 0;

                    return (
                        <div
                            key={isoDate}
                            className={`group/day relative rounded-2xl p-3 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg ${active
                                ? "border-2 border-green-600 bg-gradient-to-b from-green-200 to-green-50"
                                : "border border-green-300 bg-green-50/80 hover:border-green-500 hover:bg-green-100"
                                }`}
                        >
                            {active && (
                                <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-green-600 px-2 py-0.5 text-[9px] font-bold text-white shadow-sm">
                                    NOW
                                </span>
                            )}

                            <DayIcon
                                className={`mx-auto size-6 transition-transform duration-300 group-hover/day:scale-110 group-hover/day:-rotate-6 ${active ? "text-green-700" : "text-green-500"
                                    }`}
                            />

                            <p className="mt-2 text-xs font-bold text-green-900">{dayLabel(isoDate, idx)}</p>
                            <p className="mt-1 text-xs font-medium text-green-700/80">
                                {Math.round(daily.temperature_2m_max[idx])}°
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default WeatherCard;