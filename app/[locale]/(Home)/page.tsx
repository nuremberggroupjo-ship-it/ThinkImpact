import MovingSection from "@/components/movingsection";
import VedioSection from "@/components/video-section";


export default async function Home() {
  return (
    <main className="relative">
      <header className=" top-0 left-0 w-full h-screen z-0">
        <VedioSection />
        

      </header>

     

      <section className="relative z-10 top-[10vh] w-full">
        <MovingSection />
      </section>
    </main>
  );
}
