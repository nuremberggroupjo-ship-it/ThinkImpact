import Head from "next/head";
import React from "react";
import { getMemberById } from "@/app/models/db/lib/services/outTeam";
import { editMember } from "../(fetch)/editMember";
import EditMemberForm from "@/components/ourTeam/editMemberForm";

async function page(prop: { params: Promise<{ id: string }> }) {
  const params = await prop.params;
  const members = await getMemberById(params.id);

  return (
    <>
      <Head>
        <title>Edit Team Member - Think Impact</title>
        <meta
          name="description"
          content="Edit team member details in Think Impact's team management panel."
        />
        <link
          rel="canonical"
          href={
            process.env.NEXT_PUBLIC_APP_URL +
            `/admin/dashboard/our-team/${params.id}`
          }
        />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content="Edit Team Member - Think Impact" />
        <meta
          property="og:description"
          content="Edit team member details in Think Impact's team management panel."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={
            process.env.NEXT_PUBLIC_APP_URL +
            `/admin/dashboard/our-team/${params.id}`
          }
        />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_APP_URL + "/images/logo.png"}
        />
        <meta property="og:site_name" content="Think Impact" />
      </Head>

      <div>
        <EditMemberForm member={members[0]} action={editMember} />
      </div>
    </>
  );
}

export default page;
