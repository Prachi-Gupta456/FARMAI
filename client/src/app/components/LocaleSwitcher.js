
const lang_codes = {
  English: "en",
  Hindi: "hi",
  Gujarati: "gu",
  Bengali: "bn",
  Kannada: "kn",
  Tamil: "ta",
  Telugu: "te",
  Marathi: "mr"

}
export function changeLocale(newLocale,router) {

  const code = lang_codes[newLocale]
  document.cookie = `locale=${code}; path=/; max-age=31536000`;
  router.refresh();
}