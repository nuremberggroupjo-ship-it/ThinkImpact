import React from "react";
import Head from "next/head";
import { createSettings } from "../(fetch)/createNewSetting";
import CreateNewSetting from "@/components/settings/createNewSettingFrom";
import { getSettingsData } from "@/app/models/db/lib/services/settings";

async function page() {
  const settings = await getSettingsData();
  const existingKeys = settings
    .map((s) => s.key_name_en?.trim().toLowerCase())
    .filter((key): key is string => Boolean(key)); // remove undefined values

  return (
    <>
      <Head>
        <title>Create New Setting - Think Impact</title>
        <meta
          name="description"
          content="Create a new setting for your website in the Think Impact dashboard."
        />
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_APP_URL + "/admin/dashboard/settings/newSetting"}
        />

        {/* Open Graph */}
        <meta property="og:title" content="Create New Setting - Think Impact" />
        <meta
          property="og:description"
          content="Create a new setting for your website in the Think Impact dashboard."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_APP_URL + "/admin/dashboard/settings/newSetting"}
        />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_APP_URL + "/images/logo.png"}
        />
        <meta property="og:site_name" content="Think Impact" />
      </Head>

      <CreateNewSetting action={createSettings} existingKeys={existingKeys} />
    </>
  );
}

export default page;
