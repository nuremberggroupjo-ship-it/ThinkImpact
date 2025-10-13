import { getCourseById } from "@/app/models/db/lib/services/courses";
import { getTrainingById } from "@/app/models/db/lib/services/training";
import { notFound } from "next/navigation";
import { Card, CardContent,  CardHeader, CardTitle} from "@/components/ui/card";
import CardsWrapper from "@/components/wrappers/card-wrapper";
import Link from "next/link";

interface PageProps {
  params: { locale: string; id: string | string[] };
}

export default async function ProductPage({ params }: PageProps) {
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const locale = params.locale;

  const training = await getTrainingById(id);
  const trainingData = training[0];
  if (!trainingData) notFound();

  const courses = await getCourseById(id);

  const trainingName =
    locale === "ar" ? trainingData.name_ar : trainingData.name_en;
  const trainingDesc =
    locale === "ar"
      ? trainingData.description_ar
      : trainingData.description_en;

  return (
    <div className={`p-6 ${locale === "ar" ? "text-right" : "text-left"}`}>
      <section className="w-full md:w-3/4 mx-auto flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold mb-4 mt-20">{trainingName}</h1>
        <p className="mb-6 text-gray-600 max-w-2xl">{trainingDesc}</p>
      </section>

      <CardsWrapper>
        {courses.map((course) => {
          const title = locale === "ar" ? course.title_ar : course.title_en;
          const description =
            locale === "ar" ? course.description_ar : course.description_en;
          const duration =
            locale === "ar" ? course.duration_ar : course.duration_en;
          const audience =
            locale === "ar"
              ? course.target_audience_ar
              : course.target_audience_en;
          const delivery =
            locale === "ar"
              ? course.delivery_method_ar
              : course.delivery_method_en;

          return (
            <Card
              key={course.id}
              className="shadow-lg border border-gray-200 rounded-lg p-6 hover:shadow-xl transition-shadow flex flex-col justify-between min-h-[340px]"
            >
              <div>
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl font-bold mb-2">{title}</CardTitle>
                  <CardContent className="text-gray-600 line-clamp-3">
                    {description}
                  </CardContent>
                </CardHeader>

                <CardContent className="p-0 mt-4 space-y-2 text-sm text-gray-700">
                  {audience?.length > 0 && (
                    <p>
                      <span className="font-medium text-gray-800">
                        {locale === "ar" ? "الفئة المستهدفة" : "Audience"}:
                      </span>{" "}
                      {audience.join(", ")}
                    </p>
                  )}
                  {delivery?.length > 0 && (
                    <p>
                      <span className="font-medium text-gray-800">
                        {locale === "ar" ? "طريقة التقديم" : "Delivery"}:
                      </span>{" "}
                      {delivery.join(", ")}
                    </p>
                  )}
                  {duration && (
                    <p>
                      <span className="font-medium text-gray-800">
                        {locale === "ar" ? "المدة" : "Duration"}:
                      </span>{" "}
                      {duration}
                    </p>
                  )}
                </CardContent>
              </div>

              <div className="mt-6">
                <Link
                  href={`/${locale}/courses/${course.id}`}
                  className="block text-center w-full bg-[#125892] text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  {locale === "ar" ? "اعرف المزيد" : "Learn More"}
                </Link>
              </div>
            </Card>
          );
        })}
      </CardsWrapper>
    </div>
  );
}
