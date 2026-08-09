"use client";

import { useEffect, useState } from "react";

import Header from "./header/page";
import DynamicInputCard from "./dynamicInputCard/page";
import ChatComposer from "./composer/page";
import ChatMessages from "./chatMessages/page";
import ChatWelcome from "./welcomeCard/page";
import ContextChips from "./contextChips/page";
import { sendMessage } from "@/app/services/api";
import { useAuth } from "@clerk/nextjs";
import { setAuthToken } from "@/app/lib/setToken";
import { useRouter } from "next/navigation";
import MissingCards from "../missingCards/page";
import { useTranslations } from "next-intl";

export default function ChatPage() {

  const t = useTranslations("chat")
  const { getToken } = useAuth()
  const [showInputCard, setShowInputCard] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatId, setChatId] = useState(null);
  const router = useRouter()
  const [missingInfo, setMissingInfo] = useState([])

  const [contextData, setContextData] = useState({
    crops: [],
    season: "",
    image: null,
  });

  const startNewChat = () => {
    setContextData({ crops: [], season: "", image: null })
    setMessage("")
    setMessages([])
    setChatId(null)

  }

  useEffect(() => {
    const noCrops = !contextData.crops || contextData.crops.length === 0;
    const noSeason = !contextData.season;

    if ((noCrops || noSeason) && !showInputCard) {
      setShowInputCard(true);
    }

  }, [contextData.crops, contextData.season])

  useEffect(() => {
    if (chatId) {
      router.replace(`/components/chat/${chatId}`)
      return;
    }
  }, [chatId])

  useEffect(() => {
    async function init() {
      try {
        const token = await getToken();
        setAuthToken(token)
      } catch (err) {
        console.error("Failed to initialise chat:", err);
      }
    }
    init();
  }, [])

  const saveInSession = (chatId) => {
    const context = {
      crops: contextData.crops,
      season: contextData.season
    }
    sessionStorage.setItem(`chat_context_${chatId}`, JSON.stringify(context))
  }

  const handleContinue = () => {
    if (contextData.season && contextData.crops.length > 0) setShowInputCard(false)
  }

  const nowTime = () => {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const handleSend = async (text = message) => {

    if (contextData?.crops.length === 0 || contextData?.season === "") return;

    const content = text.trim();
    if (!content && !contextData.image) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "user",
        text: content,
        time: nowTime(),
        image: contextData?.image
      },
    ]);
    setMessage("");
    setIsTyping(true);

    const form = new FormData()

    form.append("query", content)
    if (chatId) form.append("chatId", chatId)
    form.append("season", contextData.season)
    form.append("crops", JSON.stringify(contextData.crops))
    if (contextData?.image) form.append("leaf-image", contextData.image)
    
    
    try {
     
      const res = await sendMessage(form);

      // console.log("Chat result: ", res)

      const { data } = res

      if (res.success === false) {


        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            type: "ai",
            text: t("fallbackResponse"),
            time: nowTime()
          }
        ])


        setContextData(prev => ({ ...prev, image: null }))
        return
      }

      const aiResult = data.result

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "ai",
          agent: data.selectedAgent,
          data: aiResult,
          time: nowTime(),
        },
      ]);

      if (data.missingFields?.length > 0) {
        setMissingInfo(data.missingFields)
      } else {
        setMissingInfo([])
      }

      if (data.chatId) {
        saveInSession(data.chatId)
        setChatId(data.chatId)
      }

      setContextData(prev => ({ ...prev, image: null }))

    } catch (err) {
      console.error("Failed to send message:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "ai",
          text:t("fallbackResponse"),
          time: nowTime()
        }
      ])
    } finally {
      setIsTyping(false);
    }
  }


  return (
    <div className="flex h-screen flex-col bg-gradient-to-b from-green-50 via-white to-white">
      <Header startNewChat={startNewChat}/>

      <div className="flex-1 overflow-y-auto pb-32">
        {
          missingInfo.length > 0 && (
            <MissingCards missingInfo={missingInfo} setMissingInfo={setMissingInfo} />
          )
        }

        <div className="mx-auto w-full max-w-3xl">
          {showInputCard && (
            <DynamicInputCard
              data={contextData}
              setData={setContextData}
              showInputCard={showInputCard}
              onContinue={handleContinue}
            />
          )}


          {!showInputCard && (
            <ContextChips data={contextData} setData={setContextData}
              onEdit={() => setShowInputCard(true)} />
          )}

          {messages.length === 0 && !showInputCard ? (
            <ChatWelcome handleSend={handleSend} />
          ) : (
            <ChatMessages
              isTyping={isTyping}
              messages={messages}
            />
          )}
        </div>
      </div>

      <ChatComposer data={contextData} setData={setContextData} message={message}
        setMessage={setMessage} onSend={handleSend} />
    </div>
  );
}