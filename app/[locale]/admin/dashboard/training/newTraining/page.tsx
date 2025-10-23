import React from "react";
import Head from "next/head";
import CreateNewTraining from "@/components/training/createNewTraining";
import { createTraining } from "../(fetch)/createNewTraining";

async function page() {
  return (
    <>
      <Head>
        <title>Create New Training - Think Impact</title>
        <meta
          name="description"
          content="Create a new training program in the Think Impact dashboard."
        />
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_APP_URL + "/admin/dashboard/training/newTraining"}
        />

        {/* Open Graph */}
        <meta property="og:title" content="Create New Training - Think Impact" />
        <meta
          property="og:description"
          content="Create a new training program in the Think Impact dashboard."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_APP_URL + "/admin/dashboard/training/newTraining"}
        />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_APP_URL + "/images/logo.png"}
        />
        <meta property="og:site_name" content="Think Impact" />
      </Head>

      <CreateNewTraining action={createTraining} />
    </>
  );
}

export default page;
