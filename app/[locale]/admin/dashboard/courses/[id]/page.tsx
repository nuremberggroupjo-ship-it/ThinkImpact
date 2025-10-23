import React from "react";
import Head from "next/head";
import { editCourse } from "../(fetch)/editCourse";
import EditCourseForm from "@/components/courses/editCourseForm";
import { getAllTraining } from "@/app/models/db/lib/services/training";
import { getCourseByCourseId } from "@/app/models/db/lib/services/courses";

async function page(prop: { params: Promise<{ id: string }> }) {
  const params = await prop.params;

  const course = await getCourseByCourseId(params.id);
  const training = await getAllTraining();

  return (
    <>
      <Head>
        <title>Think Impact - Edit Course</title>
        <meta
          name="description"
          content="Edit an existing course in Think Impact. Update course details, associated training, and other information."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_APP_URL}/admin/dashboard/courses/${params.id}`}
        />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content="Think Impact - Edit Course" />
        <meta
          property="og:description"
          content="Edit an existing course in Think Impact. Update course details, associated training, and other information."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_APP_URL}/admin/dashboard/courses/${params.id}`}
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_APP_URL}/images/logo.png`}
        />
        <meta property="og:site_name" content="Think Impact" />
      </Head>

      <div>
        <EditCourseForm course={course[0]} action={editCourse} training={training} />
      </div>
    </>
  );
}

export default page;
