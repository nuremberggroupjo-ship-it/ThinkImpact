import Head from "next/head";
import { getCaregoryByslug } from "@/app/models/db/lib/services/consulting";
import { getServiceByCategoryId } from "@/app/models/db/lib/services/services";
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

  const services = await getServiceByCategoryId(category[0].id ?? "");

  const categoryName =
    locale === "ar"
      ? categoryData.category_name_ar
      : categoryData.category_name_en;
  const categoryDesc =
    locale === "ar" ? categoryData.description_ar : categoryData.description_en;

  return (
    <>
      <Head>
        <title>{categoryName} - Think Impact</title>
        <meta name="description" content={categoryDesc} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_APP_URL}/Consulting/${id}`} />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content={`${categoryName} - Think Impact`} />
        <meta property="og:description" content={categoryDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_APP_URL}/Consulting/${id}`} />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:site_name" content="Think Impact" />
      </Head>

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
            const serviceName =
              locale === "ar" ? service.name_ar : service.name_en;
            const serviceDesc =
              locale === "ar" ? service.description_ar : service.description_en;

            return (
              <FlippingCard
                key={service.id}
                title={serviceName}
                description={serviceDesc}
              />
            );
          })}
        </CardsWrapper>
      </div>
    </>
  );
}
