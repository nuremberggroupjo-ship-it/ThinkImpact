import MovingSection from "@/components/movingsection";
import VideoSection from "@/components/video-section";
import ConsultingCards from "@/components/ConsultingCards/ConsultingCards";
import { getAllcategories } from "@/app/models/db/lib/services/consulting";
import InteractiveMap from "@/components/mapsection/map-section";
import Poster from "@/components/poster/poster"

export default async function Home() {
  const categories = await getAllcategories();

  return (
    <main className="relative">
      <header className="w-full h-screen">
        <div className="mt-20">
          <VideoSection />
        </div>
      </header>

      <section className="relative z-10 w-full">
        <MovingSection />
      </section>

      <section className="  relative z-10 w-full">
        <Poster/>
      </section>
    <section className="  relative z-10 w-full">
     <InteractiveMap/>
    </section>
    <section className="relative z-10 w-full">
        <Poster/>
      </section>


      <section className="bg-white dark:bg-[#020618] py-10">
        <ConsultingCards categories={categories} />
      </section>
    </main>
  );
}
