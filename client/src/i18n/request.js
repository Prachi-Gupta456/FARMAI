import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { locales, defaultLocale } from './config';


function unwrap(jsonModule) {
  const data = jsonModule.default;
  const keys = Object.keys(data);

  if (keys.length === 1 && typeof data[keys[0]] === 'object') {
    return data[keys[0]];
  }
  return data;
}

async function loadMessages(locale) {
  const [
    bottomNav,
    cardHeader,
    dashboard,
    dynamicInput,
    history,
    landing,
    onboarding,
    settings,
    weatherCard,
    welcomeCard,
    chat
  ] = await Promise.all([
    import(`../locales/${locale}/bottomNav.json`),
    import(`../locales/${locale}/cardHeader.json`),
    import(`../locales/${locale}/dashboard.json`),
    import(`../locales/${locale}/dynamicInput.json`),
    import(`../locales/${locale}/history.json`),
    import(`../locales/${locale}/landing.json`),
    import(`../locales/${locale}/onboarding.json`),
    import(`../locales/${locale}/settings.json`),
    import(`../locales/${locale}/weatherCard.json`),
    import(`../locales/${locale}/welcomeCard.json`),
    import(`../locales/${locale}/chat.json`)
  ]);

  return {
    bottomNav: unwrap(bottomNav),
    cardHeader: unwrap(cardHeader),
    dashboard: unwrap(dashboard),
    dynamicInput: unwrap(dynamicInput),
    history: unwrap(history),
    landing: unwrap(landing),
    onboarding: unwrap(onboarding),
    settings: unwrap(settings),
    weatherCard: unwrap(weatherCard),
    welcomeCard: unwrap(welcomeCard),
    chat: unwrap(chat)
  };
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value;

  const finalLocale = locales.includes(locale) ? locale : defaultLocale;

  return {
    locale: finalLocale,
    messages: await loadMessages(finalLocale),
  };
});