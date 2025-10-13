import MovingSection from "@/components/movingsection";
import VideoSection from "@/components/video-section"; 

export default async function Home() {
  return (
    <main className="relative">
\
      <header className="top-0 left-0 w-full h-screen z-0">
        <section className="mt-20">
          <VideoSection />
        </section>
      </header>

\
      <section className="relative z-10 top-[10vh] w-full">
        <MovingSection />
      </section>
\
      <section className="px-8 py-16">
        <h1 className="text-2xl font-semibold mb-4">
          Interactive Arab World Map
        </h1>
        {/* لاحقًا: حط مكون الخريطة التفاعلية هنا */}
      </section>
    </main>
  );
}
