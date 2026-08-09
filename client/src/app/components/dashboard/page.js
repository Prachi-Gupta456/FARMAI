"use client"
import {
  Bell, Camera,
  MessageCircleMore, Mic,
  Sparkles, Sprout, User,
  Settings, ChevronRight, Clock
} from "lucide-react";
import { useRouter } from "next/navigation";
import BottomNav from "../bottom-nav/page";
import { useEffect, useState } from "react";
import { fetchChats, fetchUser, fetchWeather, getFarmInsights } from "@/app/services/api";
import { useAuth } from "@clerk/nextjs";
import { setAuthToken } from "@/app/lib/setToken";
import TimeAgo from "@/app/lib/getTime";
import WeatherCard from "../weatherCard/page";
import { useTranslations } from "next-intl";
import { changeLocale } from "../LocaleSwitcher";


export default function Dashboard() {
  const router = useRouter();
  const { getToken } = useAuth();

  const [recentChats, setRecentChats] = useState([]);
  const [loadingChats, setLoadingChats] = useState(true);
  const [user, setUser] = useState(null)
  const [weatherData, setWeatherData] = useState(null)
  const [farmInsights, setFarmInsights] = useState([])
  const t = useTranslations("dashboard")


  useEffect(() => {

    if (!user) return;

    const getWeather = async () => {
      const res = await fetchWeather(user.lat, user.lng)


      if (res.success) {
        setWeatherData(res.weather)
      }
    }
    getWeather()
  }, [user?.lat, user?.lng])


  useEffect(() => {
    async function init() {
      try {
        const token = await getToken();

        setAuthToken(token);

        const res = await fetchUser();


        if (res.success) {
          setUser(res.user)

          if(res.user.language){
            changeLocale(res.user.language,router)
          }
        }

        // fetch recent chats
        const chatResult = await fetchChats()

        if (chatResult.success) {
          setRecentChats(chatResult.chats.slice(0, 5))
        }

        // fetch farm insights
        const result = await getFarmInsights()

        if (result.success) {
          setFarmInsights(result.data.result)
        }

      } catch (err) {
        console.error("Failed to initialise dashboard:", err);
      } finally {
        setLoadingChats(false);
      }
    }

    init();
  }, [])

  return (
    <div>
      <div
        className="bg-[#F4FAF6] text-zinc-950 min-h-screen 
      min-w-screen overflow-visible">
        <div
          className="min-h-screen 
        bg-[linear-gradient(180deg,oklch(0.985_0.01_145)_0%,oklch(1_0_0)_28%,oklch(0.985_0.01_145)_100%)] 
        flex flex-col">

          {/* Header */}
          <div className="flex px-2 pt-5 pb-4 justify-between items-center lg:p-6">
            <div className="flex items-center gap-3">
              <div className="size-11 ring-1 ring-[#00c950]/20 rounded-full bg-[#00c950]/15 flex justify-center items-center">
                <User className="size-5 text-[#00c950]" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="font-semibold text-zinc-950 text-sm tracking-tight lg:text-xl">
                    Hello, {user?.name || ""} 👋
                  </h1>
                  <span className="font-medium rounded-full bg-zinc-100 text-zinc-900 text-[11px] px-2.5 py-1 sm:text-sm">
                    {user?.language}
                  </span>
                </div>
                <p className="text-[#71717b] text-[13px] text-xs">
                  {t("subtitle")}
                </p>
              </div>
            </div>

            <div className="flex gap-1 sm:gap-3">
              <div className="size-8 relative shadow-sm ring-1 ring-zinc-200 bg-[#00c950] rounded-full flex justify-center items-center sm:size-11">
                <Bell className="size-4 sm:size-5 text-white" />
                {/* <span className="size-2 rounded-full bg-[#e7000b] absolute right-2 top-2" /> */}
              </div>

              <div
                onClick={() => router.push("/components/settings")}
                className="size-8 shadow-sm ring-1 ring-zinc-200 bg-[#00c950] rounded-full flex justify-center items-center sm:size-11"
              >
                <Settings className="size-4 sm:size-5 cursor-pointer text-white" />
              </div>
            </div>
          </div>

          <div className="space-y-4 px-4 pb-24 flex-1">

            {/* My Farm */}
            <div
              className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-green-100
        bg-gradient-to-br
        from-white
        via-green-50/60
        to-emerald-50
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
    "
            >

              {/* Background Glow */}

              <div
                className="
            absolute
            -right-16
            -top-16
            h-40
            w-40
            rounded-full
            bg-green-200/40
            blur-3xl
            transition
            group-hover:bg-green-300/50
        "
              />


              <div className="relative">


                {/* Header */}

                <div className="flex justify-between items-start gap-3">

                  <div className="flex items-center gap-3">


                    {/* Icon */}

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        from-[#00c950]
                        to-[#15803d]
                        shadow-lg
                        shadow-green-200
                    "
                    >
                      <Sprout className="size-6 text-white" />
                    </div>


                    <div>

                      <h2
                        className="
                            text-lg
                            font-extrabold
                            text-zinc-950
                        "
                      >
                        {t("myFarm.title")}
                      </h2>

                      <p
                        className="
                            text-xs
                            text-zinc-500
                            font-medium
                        "
                      >
                        {t("myFarm.subtitle")}
                      </p>

                    </div>

                  </div>



                  <button
                    onClick={() => router.push("/components/settings")}
                    className="
                    rounded-xl
                    bg-white
                    border
                    border-green-100
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-green-600
                    shadow-sm
                    transition-all
                    hover:bg-green-50
                    hover:-translate-y-0.5
                    active:scale-95
                "
                  >
                    {t("myFarm.edit")}
                  </button>


                </div>


                {/* Description */}

                <p
                  className="
                mt-5
                max-w-sm
                text-sm
                leading-6
                text-zinc-500
            "
                >
                  {t("myFarm.description")}
                </p>


                {/* Farm Details */}

                <div
                  className="
                mt-5
                flex
                flex-wrap
                gap-2
            "
                >

                  <span
                    className="
                    flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-zinc-200
                    bg-white
                    px-3.5
                    py-2
                    text-xs
                    font-semibold
                    text-zinc-700
                    shadow-sm
                "
                  >
                    📍 {user?.state || t("myFarm.stateFallback")}
                  </span>


                  <span
                    className="
                    rounded-full
                    border
                    border-zinc-200
                    bg-white
                    px-3.5
                    py-2
                    text-xs
                    font-semibold
                    text-zinc-700
                    shadow-sm
                "
                  >
                    🏡 {user?.district || t("myFarm.districtFallback")}
                  </span>


                  <span
                    className="
                    rounded-full
                    border
                    border-zinc-200
                    bg-white
                    px-3.5
                    py-2
                    text-xs
                    font-semibold
                    text-zinc-700
                    shadow-sm
                "
                  >
                    🌱 {user?.myFarm?.soilType || t("myFarm.soilFallback")}
                  </span>


                </div>

                {/* AI Status */}

                <div
                  className="
                mt-5
                flex
                items-center
                gap-2
                rounded-2xl
                bg-white/70
                border
                border-green-100
                px-4
                py-3
            "
                >

                  <div
                    className="
                    h-2
                    w-2
                    rounded-full
                    bg-green-500
                    animate-pulse
                "
                  />

                  <p
                    className="
                    text-xs
                    font-semibold
                    text-green-700
                "
                  >
                    {t("myFarm.contextActive")}
                  </p>

                </div>

              </div>

            </div>

            {/* Ask FarmAI */}

            <div
              className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        bg-gradient-to-br
        from-[#00c950]
        via-[#16a34a]
        to-[#15803d]
        p-5
        text-white
        shadow-xl
        shadow-green-200
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-2xl
    "
            >

              {/* Background Glow */}

              <div
                className="
            absolute
            -right-16
            -top-16
            h-44
            w-44
            rounded-full
            bg-white/20
            blur-3xl
        "
              />

              <div
                className="
            absolute
            -bottom-20
            -left-10
            h-40
            w-40
            rounded-full
            bg-emerald-300/20
            blur-3xl
        "
              />


              <div className="relative">


                <div className="flex items-center justify-between gap-4">


                  {/* Left */}

                  <div className="flex items-center gap-3">


                    <div
                      className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-white/20
                        backdrop-blur-md
                        ring-1
                        ring-white/30
                        shadow-lg
                    "
                    >
                      <MessageCircleMore className="size-7" />
                    </div>



                    <div>

                      <div className="flex items-center gap-2">

                        <p
                          className="
                                text-lg
                                font-extrabold
                            "
                        >
                          {t("askFarmAI.title")}
                        </p>


                        <span
                          className="
                                h-2
                                w-2
                                rounded-full
                                bg-white
                                animate-pulse
                            "
                        />

                      </div>


                      <p
                        className="
                            mt-1
                            text-xs
                            text-green-50/80
                            sm:text-sm
                        "
                      >
                        {t("askFarmAI.subtitle")}
                      </p>

                    </div>


                  </div>




                  {/* Actions */}

                  <div className="flex items-center gap-3">


                    {/* Voice */}

                    <button

                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-white
                        text-[#00c950]
                        shadow-lg
                        transition-all
                        hover:scale-110
                        active:scale-95
                    "
                    >
                      <Mic className="size-5" />
                    </button>




                    {/* Photo */}

                    <button
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-white/20
                        text-white
                        backdrop-blur-md
                        ring-1
                        ring-white/30
                        transition-all
                        hover:bg-white/30
                        hover:scale-110
                        active:scale-95
                    "
                    >
                      <Camera className="size-5" />
                    </button>


                  </div>


                </div>




                {/* Bottom AI Feature */}

                <div
                  className="
                mt-5
                flex
                items-center
                gap-2
                rounded-2xl
                bg-white/15
                px-4
                py-3
                backdrop-blur-md
                ring-1
                ring-white/20
            "
                >

                  <Sprout className="size-4" />

                  <p
                    className="
                    text-xs
                    font-medium
                    text-green-50
                "
                  >
                    {t("askFarmAI.feature")}
                  </p>


                </div>


              </div>


            </div>

            {/* Weather */}
            {weatherData && <WeatherCard weatherData={weatherData} />}

            {/* Recent — chats */}
            <div className="space-y-3">
              <div className="flex px-1 justify-between items-center">
                <h3 className="font-semibold text-zinc-950 text-[15px] sm:text-lg">{t("recent.title")}</h3>
                {recentChats.length > 0 && (
                  <span
                    onClick={() => router.push("/components/chat/history")}
                    className="text-[#00c950] font-semibold text-xs sm:text-sm cursor-pointer"
                  >
                    {t("recent.viewAll")}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                {loadingChats && (
                  <div className="rounded-2xl border border-zinc-100 p-4 text-center text-zinc-400 text-sm animate-pulse">
                    {t("recent.loading")}
                  </div>
                )}

                {!loadingChats && recentChats.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-zinc-200 p-6 text-center text-zinc-400 text-sm">
                    {t("recent.empty")}
                  </div>
                )}

                {!loadingChats &&
                  recentChats.map((chat) => {

                    return (
                      <div
                        key={chat._id}
                        onClick={() => router.push(`/components/chat/${chat._id}`)}
                        className="flex items-center gap-3 rounded-2xl border border-green-100 bg-white p-3 shadow-sm cursor-pointer active:scale-[0.98] transition"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-[#00c950] shrink-0">
                          <Sprout className="size-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-sm text-zinc-900">{chat.title}</p>
                          <p className="text-xs text-zinc-400 flex items-center gap-1">
                            <Clock className="size-3" /> <TimeAgo createdAt={chat.createdAt} />
                          </p>
                        </div>
                        <ChevronRight className="size-4 text-zinc-300 shrink-0" />
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* AI Farm Insights */}
            <div
              className="relative overflow-hidden rounded-3xl border border-green-100
                         bg-gradient-to-br from-green-50 via-white to-emerald-50 p-5 shadow-lg"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-green-200/40 blur-3xl" />

              <div className="relative flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-zinc-900">
                    {t("insights.title")}
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    {t("insights.subtitle")}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00C950] to-green-700 text-white shadow-lg">
                  <Sparkles className="size-6" />
                </div>
              </div>

              {/* Summary */}
              {farmInsights?.summary && (
                <div className="relative mt-5 rounded-2xl border border-green-100 bg-white p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🌱</span>

                    <p className="font-semibold text-zinc-900">
                      {t("insights.summaryTitle")}
                    </p>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    {farmInsights.summary}
                  </p>
                </div>
              )}

              {/* Insights */}
              <div className="relative mt-4 space-y-3">

                {farmInsights?.insights?.map((item, index) => (

                  <div
                    key={index}
                    className="rounded-2xl border border-green-100 bg-white p-4"
                  >
                    <div className="flex gap-3">

                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#00C950]">
                        <Sparkles className="size-4" />
                      </div>

                      <div>
                        <p className="font-medium text-zinc-900">
                          {t("insights.insightLabel")} {index + 1}
                        </p>

                        <p className="mt-1 text-sm leading-6 text-zinc-600">
                          {item}
                        </p>
                      </div>

                    </div>
                  </div>

                ))}

              </div>

            </div>

          </div>

          <BottomNav />

        </div>
      </div>
    </div>
  );
}