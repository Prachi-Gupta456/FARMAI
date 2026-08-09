import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClerkProvider>
          {children}
          </ClerkProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}