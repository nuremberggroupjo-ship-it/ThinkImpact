// app/our-team/page.tsx
import React from "react";
import Head from "next/head";
import { getAllMembers } from "@/app/models/db/lib/services/outTeam";
import OurTeamPage from "@/components/ourTeam/OurTeamPage";

export default async function Page() {
  const members = await getAllMembers();

  const title = "Our Team - Think Impact";
  const description =
    "Meet the talented professionals behind Think Impact who deliver trusted consulting and training services.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_APP_URL}/our-team`} />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_APP_URL}/our-team`} />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:site_name" content="Think Impact" />
      </Head>

      <OurTeamPage members={members || []} />
    </>
  );
}
