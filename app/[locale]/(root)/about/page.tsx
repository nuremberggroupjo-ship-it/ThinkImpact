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
    <main className="flex flex-col items-center">
      <BannerSection banners={banners} locale={locale} />
      <IntroSection />
      <MissionVisionValues />
      <ClientsCarousel clients={clients} />
      <OurMethodology />
    </main>
  );
}
