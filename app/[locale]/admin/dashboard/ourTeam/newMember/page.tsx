import Head from "next/head";
import React from "react";
import CreateNewMemberForm from "@/components/ourTeam/createNewMember";
import { createMember } from "../(fetch)/addNewMember";

async function page() {
  return (
    <>
      <Head>
        <title>Create New Team Member - Think Impact</title>
        <meta
          name="description"
          content="Add a new member to Think Impact's team using the team management panel."
        />
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_APP_URL + "/admin/dashboard/our-team/newMember"}
        />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content="Create New Team Member - Think Impact" />
        <meta
          property="og:description"
          content="Add a new member to Think Impact's team using the team management panel."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_APP_URL + "/admin/dashboard/our-team/newMember"}
        />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_APP_URL + "/images/logo.png"}
        />
        <meta property="og:site_name" content="Think Impact" />
      </Head>

      <CreateNewMemberForm action={createMember} />
    </>
  );
}

export default page;
