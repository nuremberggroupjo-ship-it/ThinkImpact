import { getCaregoryById } from "@/app/models/db/lib/services/consulting";
import { getServiceById } from "@/app/models/db/lib/services/services";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import CardsWrapper from "@/components/wrappers/card-wrapper";

interface PageProps {
  params: { locale: string; id: string | string[] };
}

export default async function ProductPage({ params }: PageProps) {
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const locale = params.locale; 

  const category = await getCaregoryById(id);
  const categoryData = category[0];
  if (!categoryData) notFound();

  const services = await getServiceById(id);

 
  const categoryName =
    locale === "ar" ? categoryData.category_name_ar : categoryData.category_name_en;
  const categoryDesc =
    locale === "ar" ? categoryData.description_ar : categoryData.description_en;

  return (
    <div className={`p-6 ${locale === "ar" ? "text-right" : "text-left"}`}>
      <h1 className="text-2xl font-bold mb-4">{categoryName}</h1>
      <p className="mb-6">{categoryDesc}</p>

      <CardsWrapper>
        {services.map((service) => {
          const serviceName = locale === "ar" ? service.name_ar : service.name_en;
          const serviceDesc =
            locale === "ar" ? service.description_ar : service.description_en;

          return (
            <Card key={service.id}>
              <CardHeader>
                <CardTitle>{serviceName}</CardTitle>
                <CardDescription>{serviceDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{locale === "ar" ? "محتوى البطاقة" : "Card Content"}</p>
              </CardContent>
            </Card>
          );
        })}
      </CardsWrapper>
    </div>
  );
}
