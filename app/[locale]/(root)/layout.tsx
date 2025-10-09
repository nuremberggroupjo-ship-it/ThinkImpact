import Footer from "@/components/ui/footer";
import Header from "@/components/header";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; 
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params; 

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="   flex flex-col min-h-screen">
       <section aria-label="Header" className="fixed w-full top-0 left-0 right-0  backdrop-blur-sm z-50">
       <Header />
       </section>
     
      
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
