"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import Header from "../header/page";
import ChatComposer from "../composer/page";
import ChatMessages from "../chatMessages/page";
import ContextChips from "../contextChips/page";
import DynamicInputCard from "../dynamicInputCard/page";
import MissingCards from "../../missingCards/page";
import { sendMessage, fetchMessages } from "@/app/services/api";
import { setAuthToken } from "@/app/lib/setToken";
import { useTranslations } from "next-intl";

const mapBackendMessage = (m, idx) => {
  const time = m.createdAt
    ? new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";

  if (m.role === "user") {
    return { id: idx, type: "user", text: m.message, time, image: m.imageUrl || null };
  }
  return { id: idx, type: "ai", agent: m.agentType, data: m.message, time };
};

const nowTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export default function ChatThreadPage() {

  const t = useTranslations("chat")
  const { getToken } = useAuth();
  const { chatId } = useParams();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [contextData, setContextData] = useState({ crops: [], season: "", image: null });
  const [missingInfo, setMissingInfo] = useState([]);
  const [showInputCard, setShowInputCard] = useState(false);
  const [contextLoaded, setContextLoaded] = useState(false);

  useEffect(() => {
    if (!chatId) return;
    const stored = sessionStorage.getItem(`chat_context_${chatId}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setContextData((prev) => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Failed to parse stored chat context:", e);
      }
    }
    setContextLoaded(true);
  }, [chatId]);

  useEffect(() => {
    if (!contextLoaded) return;

    const noCrops = !contextData.crops || contextData.crops.length === 0;
    const noSeason = !contextData.season;

    if (noCrops || noSeason) {
      setShowInputCard(true);
    }
  }, [contextData.crops, contextData.season, contextLoaded]);


  useEffect(() => {
    async function init() {
      try {
        const token = await getToken();
        setAuthToken(token);

        const res = await fetchMessages(chatId);
        if (res.success !== false && res.data?.messages) {
          // console.log(res)
          setMessages(res.data.messages.map(mapBackendMessage));
        }
      } catch (err) {
        console.error("Failed to load chat:", err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [chatId]);


  const saveInSession = (id) => {
    const context = {
      crops: contextData.crops,
      season: contextData.season
    }
    sessionStorage.setItem(`chat_context_${id}`, JSON.stringify(context))
  }

  const handleContinue = () => {
    if (contextData.season && contextData.crops.length > 0) {
      setShowInputCard(false);
      saveInSession(chatId);
    }
  };


  const handleSend = async (text = message) => {

    const content = text.trim();
    if (!content && !contextData.image) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "user", text: content, time: nowTime(), image: contextData?.image },
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

      console.log("Chatid result: ", res)

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

      setContextData(prev => ({ ...prev, image: null }))

      if (data.missingFields?.length > 0) {
        setMissingInfo(data.missingFields)
      } else {
        setMissingInfo([])
      }

      if (data.chatId) {
        saveInSession(data.chatId)
      }

    } catch (err) {
      console.error("Failed to send message:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "ai",
          text: t("fallbackResponse"),
          time: nowTime()
        }
      ])
    } finally {
      setIsTyping(false);
    }
  }


  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-zinc-400 text-sm">
        Loading conversation…
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-gradient-to-b from-green-50 via-white to-white">
      <Header />

      <div className="flex-1 overflow-y-auto pb-32">
        {missingInfo.length > 0 && (
          <MissingCards missingInfo={missingInfo} setMissingInfo={setMissingInfo} />
        )}

        <div className="mx-auto w-full max-w-3xl">
          {showInputCard ? (
            <DynamicInputCard
              data={contextData}
              setData={setContextData}
              showInputCard={showInputCard}
              onContinue={handleContinue}
            />
          ) : (
            contextData.crops?.length > 0 && (
              <ContextChips
                data={contextData}
                setData={setContextData}
                onEdit={() => setShowInputCard(true)}
              />
            )
          )}

          <ChatMessages isTyping={isTyping} messages={messages} />
        </div>
      </div>

      <ChatComposer
        data={contextData}
        setData={setContextData}
        message={message}
        setMessage={setMessage}
        onSend={handleSend}
      />
    </div>
  );
}