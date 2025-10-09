import { getCaregoryById, getCaregoryByslug } from "@/app/models/db/lib/services/consulting";
import { getServiceById } from "@/app/models/db/lib/services/services";
import { notFound } from "next/navigation";
import FlippingCard from "@/components/flippingcard/flippingcard";
import CardsWrapper from "@/components/wrappers/card-wrapper";

interface PageProps {
  params: { locale: string; slug: string | string[] };
}

export default async function ProductPage({ params }: PageProps) {
  const id = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const locale = params.locale;

  const category = await getCaregoryByslug(id);
  const categoryData = category[0];
  if (!categoryData) notFound();
 console.log("category[0].id:",category[0].id);
 
  const services = await getServiceById(category[0].id??"");
  console.log("services:",services);
  

  const categoryName =
    locale === "ar" ? categoryData.category_name_ar : categoryData.category_name_en;
  const categoryDesc =
    locale === "ar" ? categoryData.description_ar : categoryData.description_en;

  return (
    <div className={`p-6 ${locale === "ar" ? "text-right" : "text-left"}`}>
      <section
        aria-label="Spacer"
        className="w-[75%] flex flex-col items-center justify-center justify-self-center"
      >
        <h1 className="text-2xl font-bold mb-4 mt-20">{categoryName}</h1>
        <p className="mb-6">{categoryDesc}</p>
      </section>

      <CardsWrapper>
        {services.map((service) => {
          const serviceName = locale === "ar" ? service.name_ar : service.name_en;
          const serviceDesc =
            locale === "ar" ? service.description_ar : service.description_en;

          return (
            <FlippingCard
              key={service.id}          // المفتاح ضروري
              title={serviceName}
              description={serviceDesc} // هنا تعطي وصف الخدمة الحقيقي
            />
          );
        })}
      </CardsWrapper>
    </div>
  );
}
