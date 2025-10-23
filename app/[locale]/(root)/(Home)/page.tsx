import Head from "next/head";
import MovingSection from "@/components/movingsection";
import VideoSection from "@/components/video-section";
import ConsultingCards from "@/components/ConsultingCards/ConsultingCards";
import { getAllcategories } from "@/app/models/db/lib/services/consulting";
import InteractiveMap from "@/components/mapsection/map-section";
import Poster from "@/components/poster/poster";
import PosterTwo from "@/components/poster/posterTwo";
import { getSettingsData } from "@/app/models/db/lib/services/settings";
export default async function Home() {
  const categories = await getAllcategories();
  const data = await getSettingsData();


  return (
    <>
      <Head>
        <title>Think Impact - Trusted Consulting & Training</title>
        <meta
          name="description"
          content="Think Impact provides trusted insights, consulting, and professional training to guide your path forward."
        />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_APP_URL} />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content="Think Impact - Trusted Consulting & Training" />
        <meta
          property="og:description"
          content="Think Impact provides trusted insights, consulting, and professional training to guide your path forward."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_APP_URL} />
        <meta property="og:image" content="/images/logo.png"  />
        <meta property="og:site_name" content="Think Impact" />
      </Head>

      <main className="relative">
        <header className="w-full h-screen">
          <div className="mt-20">
            <VideoSection data={data} />
          </div>
        </header>

        <section className="relative z-10 w-full">
          <MovingSection />
        </section>

        <section className="relative z-10 w-full">
          <Poster data={data} />
        </section>

        <section className="relative z-10 w-full">
          <InteractiveMap />
        </section>

        <section className="relative z-10 w-full">
          <PosterTwo data={data} />
        </section>

        <section className="bg-white dark:bg-[#020618] py-10">
          <ConsultingCards categories={categories} />
        </section>
      </main>
    </>
  );
}
