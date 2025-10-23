import Head from "next/head";
import { getBannerData } from "@/app/models/db/lib/services/banners";
import { getAllClients } from "@/app/models/db/lib/services/clients";
import { newBanner } from "@/types";

import BannerSection from "@/components/banner/BannerSection";
import IntroSection from "@/components/IntroSection/IntroSection";
import MissionVisionValues from "@/components/MissionVisionValues/MissionVisionValues";
import ClientsCarousel from "@/components/ClientsCarousel/ClientsCarousel";
import OurMethodology from "@/components/OurMethodology/OurMethodology";

type Client = {
  id?: string;
  name: string;
  logo: string;
  created_at?: Date;
};

interface PageProps {
  params: {
    locale: string;
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = params;

  const banners: newBanner[] = await getBannerData();
  const clients: Client[] = await getAllClients();

  return (
    <>
      <Head>
        <title>About Us - Think Impact</title>
        <meta
          name="description"
          content="Learn about Think Impact, our mission, vision, values, and methodology. Discover how we provide consulting and training to create real impact."
        />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_APP_URL}/about`} />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content="About Us - Think Impact" />
        <meta
          property="og:description"
          content="Learn about Think Impact, our mission, vision, values, and methodology. Discover how we provide consulting and training to create real impact."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_APP_URL}/about`} />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:site_name" content="Think Impact" />
      </Head>

      <main className="flex flex-col items-center">
        <BannerSection banners={banners} locale={locale} />
        <IntroSection locale={locale} />
        <MissionVisionValues locale={locale} />
        <ClientsCarousel clients={clients} locale={locale} />
        <OurMethodology locale={locale} />
      </main>
    </>
  );
}
