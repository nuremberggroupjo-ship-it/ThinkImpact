import React from "react";
import Head from "next/head";
import { editTraining } from "../(fetch)/editTraining";
import EditTrainingForm from "@/components/training/editTrainingForm";
import { getTrainingById } from "@/app/models/db/lib/services/training";

async function page(prop: { params: Promise<{ id: string }> }) {
  const params = await prop.params;
  const training = await getTrainingById(params.id);

  return (
    <>
      <Head>
        <title>Edit Training - Think Impact</title>
        <meta
          name="description"
          content={`Edit the training program: ${training[0]?.name_en || ""} in the Think Impact dashboard.`}
        />
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_APP_URL + `/admin/dashboard/training/${training[0]?.id}`}
        />

        {/* Open Graph */}
        <meta property="og:title" content="Edit Training - Think Impact" />
        <meta
          property="og:description"
          content={`Edit the training program: ${training[0]?.name_en || ""} in the Think Impact dashboard.`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_APP_URL + `/admin/dashboard/training/${training[0]?.id}`}
        />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_APP_URL + "/images/logo.png"}
        />
        <meta property="og:site_name" content="Think Impact" />
      </Head>

      <div>
        <EditTrainingForm training={training[0]} action={editTraining} />
      </div>
    </>
  );
}

export default page;
