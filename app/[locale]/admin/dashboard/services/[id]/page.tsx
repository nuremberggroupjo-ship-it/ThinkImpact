import React from "react";
import Head from "next/head";
import { getServiceById } from "@/app/models/db/lib/services/services";
import { editService } from "../(fetch)/editService";
import EditServiceForm from "@/components/services/editServiceForm";
import { getAllcategories } from "@/app/models/db/lib/services/consulting";

async function page(prop: { params: Promise<{ id: string }> }) {
  const params = await prop.params;
  const service = await getServiceById(params.id);
  const categories = await getAllcategories();

  return (
    <>
      <Head>
        <title>Edit Service - Think Impact</title>
        <meta
          name="description"
          content="Edit the details of a specific service in Think Impact's consulting services."
        />
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_APP_URL + `/admin/dashboard/services/${params.id}`}
        />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content="Edit Service - Think Impact" />
        <meta
          property="og:description"
          content="Edit the details of a specific service in Think Impact's consulting services."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_APP_URL + `/admin/dashboard/services/${params.id}`}
        />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_APP_URL + "/images/logo.png"}
        />
        <meta property="og:site_name" content="Think Impact" />
      </Head>

      <div>
        <EditServiceForm service={service[0]} action={editService} categories={categories} />
      </div>
    </>
  );
}

export default page;
