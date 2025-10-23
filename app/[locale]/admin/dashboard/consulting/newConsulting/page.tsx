import React from "react";
import Head from "next/head";
import CreateNewCategory from "@/components/consulting/createNewCategory";
import { createCategory } from "../(fetch)/createNewCategory";

async function page() {
  return (
    <>
      <Head>
        <title>Think Impact - Create New Category</title>
        <meta
          name="description"
          content="Create a new consulting category on Think Impact to manage and organize your services."
        />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_APP_URL}/admin/dashboard/consulting/newCategory`} />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content="Think Impact - Create New Category" />
        <meta
          property="og:description"
          content="Create a new consulting category on Think Impact to manage and organize your services."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_APP_URL}/admin/dashboard/consulting/newCategory`}
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_APP_URL}/images/logo.png`}
        />
        <meta property="og:site_name" content="Think Impact" />
      </Head>

      <CreateNewCategory action={createCategory} />
    </>
  );
}

export default page;
