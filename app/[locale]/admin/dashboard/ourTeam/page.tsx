import Head from "next/head";
import { getAllMembers } from "@/app/models/db/lib/services/outTeam";
import DragDropClients from "@/components/ourTeam/dragDropOurTeam";

export default async function membersTable() {
  const members = await getAllMembers();

  return (
    <>
      <Head>
        <title>Our Team Members - Think Impact</title>
        <meta
          name="description"
          content="View and manage all members of Think Impact's team using the admin panel."
        />
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_APP_URL + "/admin/dashboard/our-team"}
        />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content="Our Team Members - Think Impact" />
        <meta
          property="og:description"
          content="View and manage all members of Think Impact's team using the admin panel."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_APP_URL + "/admin/dashboard/our-team"}
        />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_APP_URL + "/images/logo.png"}
        />
        <meta property="og:site_name" content="Think Impact" />
      </Head>

      <main className="flex flex-col justify-center items-center xl:ml-5 m-2">
        <div className="flex flex-col justify-start items-start mb-6 border-b border-gray-300 w-full">
          <h1 className="text-lg md:text-2xl font-bold">Members</h1>
          <h2 className="text-sm md:text-lg text-gray-600">
            A list of your Team Members.
          </h2>
        </div>

        {members.length === 0 ? (
          <div className="w-full text-center py-10 text-gray-500 text-lg min-w-[75vw]">
            No Members found. Please add a new Member.
          </div>
        ) : (
          <DragDropClients members={members} />
        )}
      </main>
    </>
  );
}
