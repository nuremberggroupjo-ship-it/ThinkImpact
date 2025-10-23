import Head from "next/head";
import React from "react";
import CreateNewClientForm from "@/components/clients/createNewClientForm";
import { createClient } from "../(fetch)/createNewClient";

async function page() {
  return (
    <>
      <Head>
        <title>Think Impact - Add New Client</title>
        <meta
          name="description"
          content="Add a new client to Think Impact's client list. Manage and update client details easily."
        />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_APP_URL}/admin/dashboard/clients/newClient`} />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content="Think Impact - Add New Client" />
        <meta
          property="og:description"
          content="Add a new client to Think Impact's client list. Manage and update client details easily."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_APP_URL}/admin/dashboard/clients/newClient`} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_APP_URL}/images/logo.png`}
        />
        <meta property="og:site_name" content="Think Impact" />
      </Head>

      <CreateNewClientForm action={createClient} />
    </>
  );
}

export default page;
