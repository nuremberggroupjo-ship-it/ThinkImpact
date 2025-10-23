import React from "react";
import Head from "next/head";
import CreateCourseForm from "@/components/courses/createCourseForm";
import { createnewCourse } from "../(fetch)/createNewCourse";
import { getAllTraining } from "@/app/models/db/lib/services/training";

async function page() {
  const training = await getAllTraining();

  return (
    <>
      <Head>
        <title>Create New Course - Think Impact</title>
        <meta
          name="description"
          content="Create a new course in Think Impact's training portal. Manage courses and training programs easily."
        />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_APP_URL + "/admin/dashboard/courses/new"} />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content="Create New Course - Think Impact" />
        <meta
          property="og:description"
          content="Create a new course in Think Impact's training portal. Manage courses and training programs easily."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_APP_URL + "/admin/dashboard/courses/new"} />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_APP_URL + "/images/logo.png"}
        />
        <meta property="og:site_name" content="Think Impact" />
      </Head>

      <CreateCourseForm action={createnewCourse} training={training} />
    </>
  );
}

export default page;
