import React from "react";
import logo from "@/public/images/Logo.png";
import Image from "next/image";

function page() {
  return (
    <main className="flex flex-col items-center">
      {/* Logo Section */}
      <section className="flex justify-center mt-20">
        <Image src={logo} alt="logo" width={400} height={400} className="" />
      </section>

      <section className="w-3/4 text-center mt-10">
        <p className="text-gray-700 leading-relaxed text-justify">
          <strong>Think Impact Co.</strong> is a multidisciplinary training and
          consulting firm headquartered in Amman, Jordan. We specialize in
          conducting research studies and designing evaluation programs that are
          essential in informing and assessing both development and humanitarian
          assistance interventions. Our expertise encompasses a range of
          thematic areas, including health, education, gender equality, social
          inclusion, humanitarian relief, peacebuilding, and sustainable
          development. With extensive technical experience in strategic
          evaluation planning, mixed methods research, and the development of
          Monitoring, Evaluation, and Learning (MEL) frameworks, we are
          dedicated to transforming data into actionable insights.
        </p>
      </section>
      <section className="grid  grid-cols-1 md:grid-cols-2 gap-4 mt-20 items-stretch mb-10 justify-center">
        {/* Vision Card */}
        <div className="border-2 border-[#00ADEE] rounded-lg shadow-lg shadow-slate-500/50 p-6 flex flex-col items-center max-w-sm mx-auto">
          <Image
            src={logo}
            alt="logo"
            width={200}
            height={200}
            className="mb-4"
          />
          <h2 className="text-2xl text-[#125892] font-bold w-fit mb-4">
            Vision
          </h2>
          <p className="text-justify">
            To drive sustainable change in development and humanitarian efforts
            through actionable insights from data.
          </p>
        </div>

        {/* Mission Card */}
        <div className="border-2 border-[#00ADEE] rounded-lg shadow-lg shadow-slate-500/50 p-6 flex flex-col items-center max-w-sm mx-auto">
          <Image
            src={logo}
            alt="logo"
            width={200}
            height={200}
            className="mb-4"
          />
          <h2 className="text-2xl text-[#125892] font-bold  w-fit mb-4">
            Mission
          </h2>
          <p className="text-justify">
            To empower organizations and communities with insights that foster
            informed decision-making and promote positive societal impact.
          </p>
        </div>

        {/* Values Card (spanning 2 columns) */}
        <div className="border-2 border-[#00ADEE] rounded-lg shadow-lg shadow-slate-500/50 p-6 flex flex-col items-center max-w-lg mx-auto md:col-span-2">
          <Image
            src={logo}
            alt="logo"
            width={200}
            height={200}
            className="mb-4"
          />
          <h2 className="text-2xl text-[#125892] font-bold w-fit mb-4">
            Values
          </h2>
          <p className="text-justify">
            Evidence and Learning: We emphasize evidence-based practices and
            continuous learning to ensure that our services are impactful and
            effective. Integrity and Accountability: We adhere to ethical
            standards, fostering transparent and trustworthy relationships with
            all partners, while implementing robust data protection protocols
            and maintaining well-defined processes. Inclusiveness and Diversity:
            We are committed to cultivating an inclusive environment that values
            diversity and promotes equity across all aspects of our operations.
          </p>
        </div>
      </section>
    </main>
  );
}

export default page;
