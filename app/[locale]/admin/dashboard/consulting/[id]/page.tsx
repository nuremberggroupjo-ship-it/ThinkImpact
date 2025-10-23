import React from "react";
import Head from "next/head";
import { getCaregoryById } from "@/app/models/db/lib/services/consulting";
import { editCategory } from "../(fetch)/editCategory";
import EditCategoryForm from "@/components/consulting/editCategoryForm";

async function page(prop: { params: Promise<{ id: string }> }) {
  const params = await prop.params;
  const category = await getCaregoryById(params.id);

  const categoryData = category[0];
  const categoryName = categoryData?.category_name_en || "Edit Category";

  return (
    <>
      <Head>
        <title>Think Impact - Edit {categoryName}</title>
        <meta
          name="description"
          content={`Edit the consulting category "${categoryName}" on Think Impact.`}
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_APP_URL}/admin/dashboard/consulting/${params.id}`}
        />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content={`Think Impact - Edit ${categoryName}`} />
        <meta
          property="og:description"
          content={`Edit the consulting category "${categoryName}" on Think Impact.`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_APP_URL}/admin/dashboard/consulting/${params.id}`}
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_APP_URL}/images/logo.png`}
        />
        <meta property="og:site_name" content="Think Impact" />
      </Head>

      <div>
        <EditCategoryForm category={categoryData} action={editCategory} />
      </div>
    </>
  );
}

export default page;
