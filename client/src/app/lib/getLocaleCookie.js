const SPEECH_LANG_MAP = {
  en: "en-IN",
  hi: "hi-IN",
  gu: "gu-IN",
  bn: "bn-IN",
  kn: "kn-IN",
  ta: "ta-IN",
  te: "te-IN",
  mr: "mr-IN",
}

export function getSpeechLang() {
  const code = getLocaleCookie() 
  return SPEECH_LANG_MAP[code] || "en-IN"
}

function getLocaleCookie() {
  if (typeof document === "undefined") return "en"; 

  const match = document.cookie.match(/(?:^|;\s*)locale=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : "en";
}