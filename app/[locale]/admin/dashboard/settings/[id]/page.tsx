import React from "react";
import Head from "next/head";
import { getSettingbyId } from "@/app/models/db/lib/services/settings";
import { editSetting } from "../(fetch)/editSetting";
import EditSettingForm from "@/components/settings/editSettingForm";

async function page(prop: { params: Promise<{ id: string }> }) {
  const params = await prop.params;
  const setting = await getSettingbyId(params.id);

  return (
    <>
      <Head>
        <title>Edit Setting - Think Impact</title>
        <meta
          name="description"
          content="Edit and update your website settings in Think Impact dashboard."
        />
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_APP_URL + `/admin/dashboard/settings/${params.id}`}
        />

        {/* Open Graph */}
        <meta property="og:title" content="Edit Setting - Think Impact" />
        <meta
          property="og:description"
          content="Edit and update your website settings in Think Impact dashboard."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_APP_URL + `/admin/dashboard/settings/${params.id}`}
        />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_APP_URL + "/images/logo.png"}
        />
        <meta property="og:site_name" content="Think Impact" />
      </Head>

      <div>
        <EditSettingForm setting={setting[0]} action={editSetting} />
      </div>
    </>
  );
}

export default page;
