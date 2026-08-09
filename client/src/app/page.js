"use client"
import {
  Leaf, Globe, Sparkles, Play, Mic, MessageCircleMore, Bot,
  ListChecks, ArrowRight, ChevronDown, CircleHelp,
  ScanSearch
} from "lucide-react"
import Link from "next/link"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { useAuth } from "@clerk/nextjs"
import { CAPABILITIES } from "./data/agents"
import allfaqs from "./data/faqs"
import all_languages from "./data/lang"
import { setAuthToken } from "./lib/setToken"
import { fetchUser } from "./services/api"
import { useTranslations } from "next-intl"
import { changeLocale } from "./components/LocaleSwitcher"


export default function Home() {

  const t = useTranslations('landing');
  const capabilities = CAPABILITIES
  const router = useRouter()
  const [openFaq, setOpenFaq] = useState(null);
  const faqs = allfaqs
  const [language, setLanguage] = useState("English");
  const languages = all_languages
  const [userExists, setUserExists] = useState(false)
  const { getToken } = useAuth()



  const handleLanguageChange = (newLocale) => {
    setLanguage(newLocale);
    changeLocale(newLocale,router)
  }


  // fetch user
  useEffect(() => {
    async function init() {
      try {
        const token = await getToken();

        setAuthToken(token);

        const res = await fetchUser();

        if (res.success) {
          if (res.user && res.user.language) {
            changeLocale(res.user.language,router)
            setLanguage(res.user.language)
          }
          setUserExists(true)
        }
      } catch (err) {
        console.error("Failed to initialise home page:", err);
      }
    }

    init();
  }, [])

  return (
    <div className="min-h-screen min-w-screen bg-[#F6FAF6]">

      {/* header */}
      <header className="sticky top-0 z-50 bg-[#FAFAF7]/88 backdrop-blur-md border-b border-[#2E7D32]/10">
        <nav>

          <div className="max-w-7xl mx-auto h-16 sm:h-20 px-3 sm:px-4 lg:px-8 flex items-center justify-between gap-2">

            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 shrink-0 rounded-full bg-[#2E7D32] flex items-center justify-center">
                <Leaf className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
              </div>

              <div className="min-w-0">
                <h1 className="font-bold text-sm sm:text-lg md:text-xl text-[#2E7D32] leading-tight">
                  {t("header.appName")}
                </h1>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 leading-tight">
                  {t("header.tagline")}
                </p>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-1.5 sm:gap-3 md:gap-4 shrink-0">

              <div className="relative">
                <Globe className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2E7D32]" />

                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="appearance-none rounded-full border border-gray-200 bg-white py-2 pl-9 pr-8 text-sm font-medium outline-none transition hover:bg-gray-100 cursor-pointer"
                >
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  ▾
                </span>
              </div>

              {
                userExists ? <button
                  onClick={() => router.push("/components/dashboard")}
                  className="rounded-full text-[#2E7D32] px-2 sm:px-3 py-1.5 sm:py-2 
                cursor-pointer  md:text-base font-medium 
                text-[11px] sm:text-sm hover:bg-[#EAF4EC] transition"
                >
                  Dashboard
                </button> :

                  <button
                    onClick={() => router.push("/sign-up")}
                    className="rounded-full text-[#2E7D32] px-2 sm:px-3 py-1.5 sm:py-2 
                cursor-pointer  md:text-base font-medium 
                text-[11px] sm:text-sm hover:bg-[#EAF4EC] transition"
                  >
                    {t("header.signup")}
                  </button>
              }
            </div>

          </div>
        </nav>
      </header>
      {/*  */}

      {/* container for other items */}
      <main className="px-4 pt-4 pb-8 flex-1">

        <section className="group shadow-[0_16px_40px_rgba(46,125,50,0.08)] rounded-3xl bg-[#FAFAF7] border-[#2E7D32]/10 border-1 border-solid overflow-hidden transition-shadow duration-500 hover:shadow-[0_24px_60px_rgba(46,125,50,0.14)]">

          <div className="relative w-full h-52 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
            <img
              src="dan-meyers-IQVFVH0ajag-unsplash.jpg"
              alt="Farmer in a green field"
              className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
              data-photoid="photo-farmer-phone"
              data-authorname="Markus Winkler"
              data-authorurl="https://unsplash.com/@markuswinkler"
              data-blurhash=""
            />
            <div className="bg-gradient-to-t from-[#1B3A1E]/40 via-[#2e7d32]/10 to-transparent absolute inset-0" />

            <div className="shadow-sm backdrop-blur font-semibold rounded-full bg-white/88 text-[#2E7D32] text-[11px] absolute left-4 top-4 px-3 py-1 transition-transform duration-300 group-hover:-translate-y-0.5">
              {t("hero.badge")}
            </div>

            <div className="backdrop-blur sm:max-w-[420px] shadow-[0_12px_30px_rgba(0,0,0,0.12)] rounded-[22px] bg-white/92 absolute inset-x-4 bottom-4 p-3 transition-all duration-300 group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.16)]">
              <div className="font-semibold text-[#2E7D32] text-xs leading-4 flex items-center gap-2">
                <Sparkles className="size-4 shrink-0 text-[#8BC34A] animate-pulse" />
                {t("hero.floatingCard")}
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 sm:p-5">
            <div className="space-y-3">
              <h1 className="max-w-[300px] sm:max-w-[420px] md:max-w-[520px] font-black text-[#1B1B1B] text-[28px] sm:text-[34px] md:text-[40px] leading-[32px] sm:leading-[35px] md:leading-[42px] tracking-tight">
                {t("hero.title")}
              </h1>
              <p className="max-w-[340px] sm:max-w-[440px] md:max-w-[560px] text-[#1B1B1B]/72 text-[15px] sm:text-[17px] leading-6 sm:leading-7">
                {t("hero.description")}
              </p>
            </div>

            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => router.push("/sign-up")}
                className="relative overflow-hidden font-bold shadow-[0_14px_28px_rgba(46,125,50,0.24)] rounded-full
                   bg-[#2E7D32] text-white text-[13px] sm:text-[15px] px-3 sm:px-5 flex-1 h-12 sm:h-14
                   transition-all duration-300 ease-out cursor-pointer
                   hover:bg-[#256B29] hover:shadow-[0_18px_36px_rgba(46,125,50,0.34)] hover:-translate-y-0.5
                   active:scale-[0.97] active:shadow-[0_8px_16px_rgba(46,125,50,0.24)]"
              >
                <span
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">{t("hero.primaryButton")}</span>
              </button>

              <button
                className="flex items-center justify-center font-bold rounded-full bg-white/82 text-[#2E7D32] text-[13px] sm:text-[15px] px-3 sm:px-5 flex-1 h-12 sm:h-14
                   border border-[#2E7D32]/10 shadow-[0_4px_14px_rgba(0,0,0,0.04)]
                   transition-all duration-300 ease-out cursor-pointer 
                   hover:bg-white hover:border-[#2E7D32]/25 hover:shadow-[0_10px_24px_rgba(46,125,50,0.14)] hover:-translate-y-0.5
                   active:scale-[0.97] active:bg-[#F1F7F1]"
              >
                {t("hero.secondaryButton")}
                <Play className="size-4 fill-current ml-1.5 sm:ml-2 shrink-0 transition-transform duration-300 group-hover:scale-110" />
              </button>
            </div>
          </div>
        </section>

        <section className="shadow-[0_16px_34px_rgba(46,125,50,0.24)] rounded-3xl bg-[#2E7D32] text-white mt-4 p-4">
          <div className="flex items-start gap-3">
            <div className="size-11 shrink-0 rounded-full bg-white/12 flex justify-center items-center">
              <MessageCircleMore className="size-5 text-[#E8F5E9]" />
            </div>
            <div className="space-y-3 flex-1">
              <div className="max-w-[250px] rounded-tl-2xl rounded-tr-2xl rounded-bl-md rounded-br-2xl bg-white/12 text-white text-sm leading-6 px-4 py-3">
                {t("demoChat.question")}
              </div>
              <div className="rounded-tl-md rounded-tr-2xl rounded-bl-2xl rounded-br-2xl bg-[#E8F5E9] text-[#1B1B1B] text-sm leading-6 px-4 py-3">
                <div className="text-[#2E7D32] flex items-center gap-2">
                  <Bot className="size-4" />
                  <span className="font-semibold">{t("demoChat.typing")}</span>
                  <span className="flex gap-1">
                    <span className="size-1.5 animate-pulse rounded-full bg-[#8BC34A]" />
                    <span className="size-1.5 animate-pulse [animation-delay:120ms] rounded-full bg-[#8BC34A]" />
                    <span className="size-1.5 animate-pulse [animation-delay:240ms] rounded-full bg-[#8BC34A]" />
                  </span>
                </div>
                <p className="text-[#1B1B1B]/80 mt-2">
                  {t("demoChat.answer")}
                </p>
              </div>
            </div>
            <div className="size-11 shrink-0 rounded-full bg-white/12 flex justify-center items-center">
              <Mic className="size-5 text-[#E8F5E9]" />
            </div>
          </div>
        </section>

        <section className="space-y-3 mt-5">
          <div className="flex px-1 justify-between items-center">
            <h2 className="font-extrabold text-[#1B1B1B] text-lg leading-7 tracking-tight">
              {t("capabilities.title")}
            </h2>
            <span className="font-semibold text-[#2E7D32] text-xs leading-4">
              {t("capabilities.subtitle")}
            </span>
          </div>

          <div
            className="cursor-pointer flex overflow-x-auto snap-x snap-mandatory pb-1 gap-3
                [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                md:grid md:grid-cols-4 md:overflow-visible md:snap-none md:gap-6"
          >
            {capabilities.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                style={{ animationDelay: `${i * 80}ms`, perspective: "800px" }}
                className="min-w-[150px] snap-start"
              >
                <div
                  className="group relative rounded-[22px] bg-white
               border-[#2E7D32]/10 border-1 border-solid p-4
               opacity-0 animate-[card-in_0.5s_ease-out_forwards]
               transition-all duration-300 ease-out [transform-style:preserve-3d]
               shadow-sm hover:shadow-[0_30px_50px_-15px_rgba(46,125,50,0.4)]
               hover:[transform:translateZ(40px)_scale(1.05)]
               active:[transform:translateZ(20px)_scale(0.98)]"
                >
                  <div className="w-fit rounded-full bg-[#EAF4EC] p-2 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-6 [transform:translateZ(20px)]">
                    <Icon className="size-6 text-[#8BC34A]" />
                  </div>

                  <div className="font-bold text-[#1B1B1B] text-[14px] mt-3 sm:text-lg [transform:translateZ(15px)]">
                    {title}
                  </div>
                  <p className="text-[#1B1B1B]/65 font-semibold text-xs leading-5 mt-1 sm:text-sm [transform:translateZ(10px)]">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="shadow-sm rounded-3xl bg-white mt-6 p-5">

          <div className="flex items-center gap-2">
            <div className="size-9 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex justify-center items-center">
              <ListChecks className="size-5" />
            </div>
            <h2 className="font-extrabold text-[#1B1B1B] text-lg leading-7 tracking-tight">
              {t("howItWorks.title")}
            </h2>
          </div>

          {/* Mobile — vertical timeline */}

          <div className="sm:hidden space-y-4 mt-4">
            <div className="flex gap-3">
              <div className="shrink-0 font-bold rounded-full bg-[#2E7D32] text-white text-sm leading-5 flex justify-center items-center w-10 h-10">
                1
              </div>
              <div>
                <div className="font-bold text-[#1B1B1B] text-[15px]">
                  {t("howItWorks.step1.title")}
                </div>
                <div className="text-[#1B1B1B]/68 text-[13px] leading-6 mt-1">
                  {t("howItWorks.step1.description")}
                </div>
              </div>
            </div>
            <div className="bg-[#2E7D32]/20 ml-5 w-px h-6" />
            <div className="flex gap-3">
              <div className="shrink-0 font-bold rounded-full bg-[#8BC34A] text-white text-sm leading-5 flex justify-center items-center w-10 h-10">
                2
              </div>
              <div>
                <div className="font-bold text-[#1B1B1B] text-[15px]">
                  {t("howItWorks.step2.title")}
                </div>
                <div className="text-[#1B1B1B]/68 text-[13px] leading-6 mt-1">
                  {t("howItWorks.step2.description")}
                </div>
              </div>
            </div>
            <div className="bg-[#2E7D32]/20 ml-5 w-px h-6" />
            <div className="flex gap-3">
              <div className="shrink-0 font-bold rounded-full bg-[#2E7D32] text-white text-sm leading-5 flex justify-center items-center w-10 h-10">
                3
              </div>
              <div>
                <div className="font-bold text-[#1B1B1B] text-[15px]">
                  {t("howItWorks.step3.title")}
                </div>
                <div className="text-[#1B1B1B]/68 text-[13px] leading-6 mt-1">
                  {t("howItWorks.step3.description")}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop — boxes connected by arrows */}
          <div className="hidden lg:flex items-stretch gap-3 mt-6">
            <div className="flex-1 rounded-2xl border border-[#2E7D32]/10 bg-[#FAFAF7] p-5 text-center">
              <div className="mx-auto rounded-full bg-[#2E7D32] text-white w-11 h-11 flex justify-center items-center mb-3 font-bold">
                1
              </div>
              <div className="font-bold text-[#1B1B1B] text-[15px]">
                {t("howItWorks.step1.title")}
              </div>
              <div className="text-[#1B1B1B]/68 text-[13px] leading-6 mt-1">
                {t("howItWorks.step1.description")}
              </div>
            </div>

            <div className="flex items-center px-2">
              <ArrowRight className="size-5 text-[#2E7D32]/40" />
            </div>

            <div className="flex-1 rounded-2xl border border-[#2E7D32]/10 bg-[#FAFAF7] p-5 text-center">
              <div className="mx-auto rounded-full bg-[#8BC34A] text-white w-11 h-11 flex justify-center items-center mb-3 font-bold">
                2
              </div>
              <div className="font-bold text-[#1B1B1B] text-[15px]">
                {t("howItWorks.step2.title")}
              </div>
              <div className="text-[#1B1B1B]/68 text-[13px] leading-6 mt-1">
                {t("howItWorks.step2.description")}
              </div>
            </div>

            <div className="flex items-center px-2">
              <ArrowRight className="size-5 text-[#2E7D32]/40" />
            </div>

            <div className="flex-1 rounded-2xl border border-[#2E7D32]/10 bg-[#FAFAF7] p-5 text-center">
              <div className="mx-auto rounded-full bg-[#2E7D32] text-white w-11 h-11 flex justify-center items-center mb-3 font-bold">
                3
              </div>
              <div className="font-bold text-[#1B1B1B] text-[15px]">
                {t("howItWorks.step3.title")}
              </div>
              <div className="text-[#1B1B1B]/68 text-[13px] leading-6 mt-1">
                {t("howItWorks.step3.description")}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-[#E8F5E9] mt-6 p-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="shadow-sm text-center rounded-[20px] bg-white p-3">
              <div className="font-black text-[#2E7D32] text-xl leading-7">
                8
              </div>
              <div className="font-semibold text-[#1B1B1B]/70 text-xs leading-4 mt-1">
                {t("stats.agents")}
              </div>
            </div>
            <div className="shadow-sm text-center rounded-[20px] bg-white p-3">
              <div className="font-black text-[#2E7D32] text-xl leading-7">
                8
              </div>
              <div className="font-semibold text-[#1B1B1B]/70 text-xs leading-4 mt-1">
                {t("stats.languages")}
              </div>
            </div>
            <div className="shadow-sm text-center rounded-[20px] bg-white p-3">
              <div className="font-black text-[#2E7D32] text-xl leading-7">
                24/7
              </div>
              <div className="font-semibold text-[#1B1B1B]/70 text-xs leading-4 mt-1">
                {t("stats.support")}
              </div>
            </div>
          </div>
        </section>

        {/* Feedback */}
        <section className="space-y-3 mt-6">
          <div className="flex px-1 justify-between items-center">
            <h2 className="font-extrabold text-[#1B1B1B] text-lg leading-7 tracking-tight">
              {t("testimonials.title")}
            </h2>
            <span className="font-semibold text-[#2E7D32] text-xs leading-4 sm:text-lg">
              {t("testimonials.carousel")}
            </span>
          </div>
          <div className="snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex pb-1 gap-3">
            <div className="min-w-[280px] snap-start shadow-sm rounded-3xl bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex justify-center items-center">
                  <MessageCircleMore className="size-6" />
                </div>
                <div>
                  <div className="font-bold text-[#1B1B1B] text-[15px]">
                    {t("testimonials.voice.title")}
                  </div>
                  <div className="text-[#1B1B1B]/50 text-xs">
                    {t("testimonials.voice.subtitle")}
                  </div>
                </div>
              </div>
              <p className="text-[#1B1B1B]/70 text-[13px] leading-6 mt-3">
                {t("testimonials.voice.description")}
              </p>
            </div>
            <div className="min-w-[280px] snap-start shadow-sm rounded-3xl bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex justify-center items-center">
                  <ScanSearch className="size-6" />
                </div>
                <div>
                  <div className="font-bold text-[#1B1B1B] text-[15px]">
                    {t("testimonials.disease.title")}
                  </div>
                  <div className="text-[#1B1B1B]/50 text-xs">
                    {t("testimonials.disease.subtitle")}
                  </div>
                </div>
              </div>
              <p className="text-[#1B1B1B]/70 text-[13px] leading-6 mt-3">
                {t("testimonials.disease.description")}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="shadow-sm rounded-3xl bg-white mt-6 p-5">

          <div className="flex items-center gap-2">
            <div className="size-9 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex justify-center items-center">
              <CircleHelp className="size-5" />
            </div>

            <h2 className="font-extrabold text-[#1B1B1B] text-lg leading-7 tracking-tight">
              {t("faq.title")}
            </h2>
          </div>

          <div className="space-y-3 mt-4">

            {faqs.map((faq, index) => {

              const isOpen = openFaq === index;

              return (

                <div
                  key={index}
                  className="rounded-[20px] bg-[#FAFAF7] border border-[#2E7D32]/10 overflow-hidden transition-all duration-300"
                >

                  <button
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    className="w-full flex items-center justify-between gap-3 p-4 cursor-pointer"
                  >

                    <p className="font-bold text-[#1B1B1B] text-sm leading-5 text-left">
                      {faq.question}
                    </p>

                    <ChevronDown
                      className={`size-4 text-[#2E7D32] transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                    />

                  </button>

                  <div
                    className={`grid transition-all duration-300 ${isOpen
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                      }`}
                  >

                    <div className="overflow-hidden">

                      <div className="px-4 pb-4 text-sm leading-6 text-zinc-600 border-t border-[#2E7D32]/10 pt-3">

                        {faq.answer}

                      </div>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        </section>

        <section className="bg-[linear-gradient(135deg,#2E7D32_0%,#3E8E41_55%,#8BC34A_100%)] shadow-[0_16px_36px_rgba(46,125,50,0.24)] rounded-3xl text-white mt-6 p-5 overflow-hidden">
          <div className="space-y-3">
            <div className="leading-tight font-black text-2xl leading-8 tracking-tight">
              {t("cta.title")}
            </div>
            <p className="text-white/88 text-sm leading-6">
              {t("cta.description")}
            </p>
            <button
              onClick={() => router.push("/sign-up")}
              className="font-extrabold shadow-none rounded-full bg-white
             text-[#2E7D32] text-[15px] px-5 w-full h-14 cursor-pointer
             active:scale-98">
              {t("cta.button")}
            </button>
          </div>
        </section>
      </main>

      {/* footer */}
      <footer
        className="bg-[#2E7D32] text-white border-[#2E7D32]/10 border-t-1 
      border-r-0 border-b-0 border-l-0 border-solid px-4 py-6">

        <div className="pl-5 grid grid-cols-2 sm:grid-cols-4 gap-5">

          {/* Product */}
          <div>
            <div className="font-extrabold uppercase text-[#E8F5E9] text-[13px] tracking-[2.24px]">
              {t("footer.product")}
            </div>
            <div className="space-y-2 text-white/82 text-[13px] mt-3">
              <div>AI Farming Assistant</div>
              <div>Disease Detection</div>
              <div>Weather Advisory</div>
              <div>Crop Recommendation</div>
              <div>Market Intelligence</div>
              <div>Irrigation Advisor</div>
              <div>Fertilizer Advisor</div>
              <div>Pest Management</div>
              <div>Government Schemes</div>

            </div>
          </div>

          {/* Company */}
          <div>
            <div className="font-extrabold uppercase text-[#E8F5E9] text-[13px] tracking-[2.24px]">
              {t("footer.company")}
            </div>
            <div className="space-y-2 text-white/82 text-[13px] mt-3 flex flex-col">
              <Link className="hover:text-amber-500" href="/components/information/about">About Us</Link>
              <Link className="hover:text-amber-500" href="/components/information/mission">Our Mission</Link>
              <Link className="hover:text-amber-500" href="/components/information/privacy-policy">Privacy Policy</Link>
              <Link className="hover:text-amber-500" href="/components/information/terms-and-conditions">Terms & Conditions</Link>
              <Link className="hover:text-amber-500" href="/components/information/ai-policy">AI Usage Policy</Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <div className="font-extrabold uppercase text-[#E8F5E9] text-[13px] tracking-[2.24px]">
              {t("footer.support")}
            </div>
            <div className="space-y-2 text-white/82 text-[13px] mt-3 flex flex-col">

              <Link className="hover:text-amber-500" href="/components/information/help-center">Help Center</Link>
              <Link className="hover:text-amber-500" href="/components/information/contact-us">Contact Us</Link>
              <Link className="hover:text-amber-500" href="/components/information/report-issue">Report an Issue</Link>
              <Link className="hover:text-amber-500" href="/components/information/feedback">Send Feedback</Link>

            </div>
          </div>

          {/* Languages Supported */}
          <div>
            <div className="font-extrabold uppercase text-[#E8F5E9] text-[13px] tracking-[2.24px]">
              {t("footer.languages")}
            </div>
            <div className="space-y-2 text-white/82 text-[13px] mt-3">
              <div>English</div>
              <div>Hindi</div>
              <div>বাংলা</div>
              <div>தமிழ்</div>
              <div>తెలుగు</div>
              <div>मराठी</div>
              <div>ગુજરાતી</div>
              <div>ಕನ್ನಡ</div>
            </div>
          </div>

        </div>

        <div className="flex flex-col gap-2 text-white/65 text-xs leading-4 border-white/10 border-t-1 border-r-0 border-b-0 border-l-0 border-solid mt-6 pt-4">
          <p>{t("footer.copyright")}</p>
          <p className="font-semibold text-white">{t("footer.madeWith")}</p>
        </div>

      </footer>

    </div>
  )
}