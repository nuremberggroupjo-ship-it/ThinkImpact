import React from "react";
import Head from "next/head";
import NewApplicationForm from "@/components/careers/newApplicationForm";
import { newApplication } from "./(fetch)/newApplication";

type Props = {
  params: Promise<{ locale: string }>;
};

async function page({ params }: Props) {
  const { locale } = await params;

  // You can add translations here if needed
  const title = locale === "ar" ? "تقديم طلب جديد - Think Impact" : "New Application - Think Impact";
  const description =
    locale === "ar"
      ? "قدّم طلبك الآن للانضمام إلى فريق Think Impact والتطور المهني."
      : "Submit your application now to join Think Impact and grow professionally.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_APP_URL}/newApplication`} />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_APP_URL}/newApplication`} />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:site_name" content="Think Impact" />
      </Head>

      <div>
        <NewApplicationForm action={newApplication} locale={locale} />
      </div>
    </>
  );
}

export default page;
