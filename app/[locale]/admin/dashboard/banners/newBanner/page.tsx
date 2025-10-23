import React from "react";
import Head from "next/head";
import CreateNewBanner from "@/components/banner/createNewBanner";
import { createBanner } from "../(actions)/addNewBanner";

async function page() {
  return (
    <>
      <Head>
        <title>Think Impact - Create New Banner</title>
        <meta
          name="description"
          content="Add a new banner for Think Impact website. Manage and update banners efficiently."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_APP_URL}/admin/create-banner`}
        />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content="Think Impact - Create New Banner" />
        <meta
          property="og:description"
          content="Add a new banner for Think Impact website. Manage and update banners efficiently."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_APP_URL}/admin/create-banner`}
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_APP_URL}/images/logo.png`}
        />
        <meta property="og:site_name" content="Think Impact" />
      </Head>

      <CreateNewBanner action={createBanner} />
    </>
  );
}

export default page;
