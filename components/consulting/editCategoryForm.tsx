"use client"
import { newCategory } from "@/types";
import ImageUploader from "@/components/imageUpload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation"; 

interface prop {
  category: newCategory;
  action: (data: {
    id?: string;
    slug?:string;
    category_name_en: string;
    category_name_ar: string;
    description_en: string;
    description_ar: string;
    category_logo: string | null;
  }) => Promise<void>;
}

function editCategoryForm({ category, action }: prop) {
  const router = useRouter();
  const [form, setForm] = useState<newCategory>({
    id:category.id??"",
    slug:category.slug ?? "",
    category_name_en: category.category_name_en ?? "",
    category_name_ar: category.category_name_ar,
    description_en: category.description_en ?? "",
    description_ar: category.description_ar ?? "",
    category_logo: category.category_logo ?? null,
    
  });

  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUploadComplete = (url: string) => {
    setForm({ ...form, category_logo: url });
  };

  const handleUploadError = (error: Error) => {
    console.error(error);
    setToast({ message: `Upload failed: ${error.message}`, type: "error" });
    setTimeout(() => setToast(null), 3000);
  };

  const handleImageDelete = () => {
    setForm({ ...form,category_logo: null });
  };

  const handleFormSubmit = () => {
    startTransition(async () => {
      try {
        await action(form );
        setToast({ message: "Category updated successfully!", type: "success" });

        setTimeout(() => {
          setToast(null);
          router.replace("/admin/dashboard/consulting");
        }, 1500);
      } catch (error) {
        console.error(error);
        setToast({ message: "Failed to update Category.", type: "error" });
        setTimeout(() => setToast(null), 3000);
      }
    });
  };
  return (
    <main className="ml-3 xl:ml-7 mb-7">
      <div className="flex flex-col justify-start items-start border-b border-gray-500 w-[70vw] mb-7">
        <h1 className="text-lg md:text-2xl font-bold">Edit Category</h1>
        <p className="text-xs md:text-base text-gray-600">ID: {category.id}</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit();
        }}
        className="h-full w-full lg:w-[70vw] flex flex-col gap-5"
      >
        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle>Edit Category Details</CardTitle>
            <CardDescription>
              Fill out the required fields below to update your Category.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-start gap-5 mb-7">
             <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Slug  
              </label>
              <input
                type="text"
                name="slug"
                value={form.category_name_en.split(" ").join("-")}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[55vw] xl:w-[20vw] h-[5vh] text-black"
                required
              />
            </div>
           <div className="flex flex-col lg:flex lg:flex-row lg:justify-start gap-7 ">
             <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> English Name 
              </label>
              <input
                type="text"
                name="category_name_en"
                value={form.category_name_en}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[55vw] xl:w-[20vw] h-[5vh] text-black"
                required
              />
            </div>

              <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Arabic Name 
              </label>
              <input
                type="text"
                name="category_name_ar"
                value={form.category_name_ar}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[55vw] xl:w-[20vw] h-[5vh] text-black"
                required
              />
            </div>
           </div>

            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> English
                Description
              </label>
              <textarea
                name="description_en"
                value={form.description_en}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[15vh] text-black"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Arabic
                Description
              </label>
              <textarea
                name="description_ar"
                value={form.description_ar}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[15vh] text-black"
                required
              />
            </div>

            <div className="flex flex-col w-full max-w-sm">
              <label className="text-base text-black mb-1">Category Logo</label>
              <ImageUploader
                endpoint="consulting"
                initialImageUrl={form.category_logo ?? ""}
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
                onDelete={handleImageDelete}
              />
            </div>

            <div className="w-full flex justify-center mt-5 ">
              <div className="flex flex-row gap-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                  onClick={() => {
                    router.replace("/admin/dashboard/consulting");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#125892] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#0f4473]"
                  disabled={isPending}
                >
                  {isPending ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>

      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-5 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}
    </main>
  );
}

export default editCategoryForm;
