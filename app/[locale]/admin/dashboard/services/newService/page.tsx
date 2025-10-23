import React from "react";
import Head from "next/head";
import CreateNewService from "@/components/services/createNewService";
import { createService } from "../(fetch)/createService";
import { getAllcategories } from "@/app/models/db/lib/services/consulting";

async function page() {
  const categories = await getAllcategories();

  return (
    <>
      <Head>
        <title>Create New Service - Think Impact</title>
        <meta
          name="description"
          content="Add a new service to Think Impact's consulting offerings."
        />
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_APP_URL + "/admin/dashboard/services/newService"}
        />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content="Create New Service - Think Impact" />
        <meta
          property="og:description"
          content="Add a new service to Think Impact's consulting offerings."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_APP_URL + "/admin/dashboard/services/newService"}
        />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_APP_URL + "/images/logo.png"}
        />
        <meta property="og:site_name" content="Think Impact" />
      </Head>

      <CreateNewService action={createService} categories={categories} />
    </>
  );
}

export default page;
