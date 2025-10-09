import { getCaregoryById, getCaregoryByslug } from "@/app/models/db/lib/services/consulting";
import { getCourseById } from "@/app/models/db/lib/services/courses";
import { notFound } from "next/navigation";
import FlippingCard from "@/components/flippingcard/flippingcard";
import CardsWrapper from "@/components/wrappers/card-wrapper";
import { getTrainingById } from "@/app/models/db/lib/services/training";

interface PageProps {
  params: { locale: string; id: string | string[] };
}

export default async function ProductPage({ params }: PageProps) {
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const locale = params.locale;

  const training = await getTrainingById(id);
  const trainingData = training[0];
  if (!trainingData) notFound();
 console.log("training[0].id:",training[0].id);
 
  const courses = await getCourseById(id);
  console.log("services:",courses);
  

  const trainingName =
    locale === "ar" ? trainingData.name_ar : trainingData.name_en;
  const trainingDesc =
    locale === "ar" ? trainingData.description_ar : trainingData.description_en;

  return (
    <div className={`p-6 ${locale === "ar" ? "text-right" : "text-left"}`}>
      <section
        aria-label="Spacer"
        className="w-[75%] flex flex-col items-center justify-center justify-self-center"
      >
        <h1 className="text-2xl font-bold mb-4 mt-20">{trainingName}</h1>
        <p className="mb-6">{trainingDesc}</p>
      </section>

      <CardsWrapper>
        {courses.map((course) => {
          const courseName = locale === "ar" ? course.title_ar : course.title_en;
          const coursesDesc =
            locale === "ar" ? course.description_ar : course.description_en;

          return (
            <FlippingCard
              key={course.id}          // المفتاح ضروري
              title={courseName}
              description={coursesDesc} // هنا تعطي وصف الخدمة الحقيقي
            />
          );
        })}
      </CardsWrapper>
    </div>
  );
}
