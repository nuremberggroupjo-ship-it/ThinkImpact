"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import ImageUploader from "@/components/imageUpload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { newSetting } from "@/types";

interface Option {
  value: string;
  label: string;
  type: "text" | "number" | "textarea" | "image" | "video";
  placeholder?: string;
}

interface Props {
  action: (data: newSetting) => Promise<void>;
  existingKeys?: string[];
  options?: Option[];
}

export default function CreateNewSetting({
  action,
  existingKeys = [],
  options,
}: Props) {
  const router = useRouter();
  const [form, setForm] = useState<newSetting>({
    id: "",
    key_name_en: "",
    key_name_ar: "",
    value_en: "",
    value_ar: "",
  });

  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // separate uploading states for en/ar (we only use en for non-text types)
  const [isUploadingEn, setIsUploadingEn] = useState(false);
  const [isUploadingAr, setIsUploadingAr] = useState(false);

  // Default options
  const defaultOptions: Option[] = [
    {
      value: "number_of_clients",
      label: "Number Of Clients",
      type: "number",
      placeholder: "e.g. 42",
    },
    {
      value: "number_of_projects",
      label: "Number Of Projects",
      type: "number",
      placeholder: "e.g. 120",
    },
    { value: "home_video", label: "Video In Home Page", type: "video" },
    { value: "text_home_video", label: "Text In Home Page", type: "text" },
    { value: "part_one_header", label: "Header In Part One", type: "text" },
    {
      value: "part_one_description",
      label: "Description In Part One",
      type: "textarea",
    },
    { value: "part_one_image", label: "Image In Part One", type: "image" },
    { value: "part_two_header", label: "Header In Part Two", type: "text" },
    {
      value: "part_two_description",
      label: "Description In Part Two",
      type: "textarea",
    },
    { value: "part_two_image", label: "Image In Part Two", type: "image" },
    { value: "about_page_text", label: "Text In About Page", type: "textarea" },
  ];

  const availableOptions = options ?? defaultOptions;

  // helper to set a form field
  const setField = <K extends keyof newSetting>(key: K, val: newSetting[K]) => {
    setForm((p) => ({ ...p, [key]: val }));
  };

  // When key changes, reset both values (and Arabic key name)
  useEffect(() => {
    setForm((p) => ({ ...p, value_en: "", value_ar: "" }));
  }, [form.key_name_en]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name as keyof newSetting;
    setField(name, e.target.value as any);
  };

  // EN upload handlers
  const handleImageUploadedEn = (url: string) => {
    setIsUploadingEn(false);
    setField("value_en", url);
  };
  const handleImageUploadErrorEn = (err: Error) => {
    setIsUploadingEn(false);
    setToast({ message: "Image upload failed. Please try again.", type: "error" });
    setTimeout(() => setToast(null), 3000);
  };
  const handleVideoUploadCompleteEn = (res: any) => {
    setIsUploadingEn(false);
    if (res && res[0]) {
      setField("value_en", res[0].url as string);
    } else {
      setToast({ message: "Video upload failed. No file returned.", type: "error" });
      setTimeout(() => setToast(null), 3000);
    }
  };
  const handleVideoUploadErrorEn = () => {
    setIsUploadingEn(false);
    setToast({ message: "Video upload failed. Please try again.", type: "error" });
    setTimeout(() => setToast(null), 3000);
  };

  // AR upload handlers (only used if you later decide to enable uploads for AR)
  const handleImageUploadedAr = (url: string) => {
    setIsUploadingAr(false);
    setField("value_ar", url);
  };
  const handleImageUploadErrorAr = (err: Error) => {
    setIsUploadingAr(false);
    setToast({ message: "Image upload failed. Please try again.", type: "error" });
    setTimeout(() => setToast(null), 3000);
  };
  const handleVideoUploadCompleteAr = (res: any) => {
    setIsUploadingAr(false);
    if (res && res[0]) {
      setField("value_ar", res[0].url as string);
    } else {
      setToast({ message: "Video upload failed. No file returned.", type: "error" });
      setTimeout(() => setToast(null), 3000);
    }
  };
  const handleVideoUploadErrorAr = () => {
    setIsUploadingAr(false);
    setToast({ message: "Video upload failed. Please try again.", type: "error" });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFormSubmit = () => {
    const selectedOpt = availableOptions.find((o) => o.value === form.key_name_en);

    if (!form.key_name_en) {
      setToast({ message: "Please choose a setting key.", type: "error" });
      setTimeout(() => setToast(null), 2500);
      return;
    }

    if (
      selectedOpt &&
      selectedOpt.type !== "image" &&
      selectedOpt.type !== "video" &&
      !form.value_en
    ) {
      setToast({ message: "Please enter a value.", type: "error" });
      setTimeout(() => setToast(null), 2500);
      return;
    }

    startTransition(async () => {
      try {
        // ensure everything saved as string
        if (typeof form.value_en !== "string") {
          form.value_en = String(form.value_en ?? "");
        }
        if (typeof form.value_ar !== "string") {
          form.value_ar = String(form.value_ar ?? "");
        }

        await action({ ...form });
        setToast({ message: "Setting added successfully!", type: "success" });
        setTimeout(() => {
          setToast(null);
          router.replace("/admin/dashboard/settings");
        }, 1500);
      } catch (err) {
        console.error(err);
        setToast({ message: "Failed to add Setting.", type: "error" });
        setTimeout(() => setToast(null), 3000);
      }
    });
  };

  // compute selected option once so EN and AR renderers use same info
  const selected = availableOptions.find((o) => o.value === form.key_name_en);

  // unified width classes for both EN and AR inputs
  const inputWidthClass = "w-[90vw] md:w-[75vw] lg:w-[55vw] xl:w-[30vw]";
  const textareaWidthClass = "w-[90vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw]";

  // render EN input
  const renderValueInput = () => {
    if (!selected) {
      return <div className="text-sm text-gray-500">Choose a key above to enter the appropriate value.</div>;
    }

    switch (selected.type) {
      case "text":
        return (
          <input
            type="text"
            name="value_en"
            value={form.value_en ?? ""}
            onChange={handleInputChange}
            className={`border px-2 py-1 rounded border-black bg-white ${inputWidthClass} h-[5vh] text-black`}
            placeholder={selected.placeholder ?? ""}
            required
          />
        );
      case "number":
        return (
          <input
            type="number"
            name="value_en"
            value={form.value_en ?? ""}
            onChange={handleInputChange}
            className={`border px-2 py-1 rounded border-black bg-white ${inputWidthClass} h-[5vh] text-black`}
            placeholder={selected.placeholder ?? ""}
            required
          />
        );
      case "textarea":
        return (
          <textarea
            name="value_en"
            value={form.value_en ?? ""}
            onChange={handleInputChange}
            className={`border px-2 py-1 rounded border-black bg-white ${textareaWidthClass} h-[15vh] text-black`}
            required
          />
        );
      case "image":
        return (
          <div className="flex flex-col gap-2">
            <ImageUploader
              endpoint="banners"
              initialImageUrl={form.value_en ?? null}
              onUploadComplete={(url) => handleImageUploadedEn(url)}
              onUploadError={(err) => handleImageUploadErrorEn(err)}
              onDelete={() => setField("value_en", "")}
            />
            {form.value_en && (
              <div className="mt-2">
                <Image
                  src={form.value_en as string}
                  alt="preview"
                  width={400}
                  height={220}
                  className="object-cover rounded-lg border border-gray-300"
                />
              </div>
            )}
          </div>
        );
      case "video":
        return (
          <div className="flex flex-col gap-2">
            <UploadDropzone<OurFileRouter, "settings">
              endpoint="settings"
              onUploadBegin={() => {
                setIsUploadingEn(true);
                setToast(null);
              }}
              onClientUploadComplete={(res) => handleVideoUploadCompleteEn(res)}
              onUploadError={() => handleVideoUploadErrorEn()}
              appearance={{
                container:
                  "flex flex-col items-center justify-center h-64 " +
                  `${inputWidthClass} text-center p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors`,
                button: "bg-[#125892] text-white rounded-md px-4 py-2 mt-3",
                label: "text-gray-500",
              }}
              content={{
                label: ({ isDragActive }) => (
                  <div className="flex flex-col items-center">
                    <div className="text-sm font-semibold">
                      {isDragActive ? "Drop the video" : "Drop video or click to browse"}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Allowed: video files (Max Size: 64MB)</div>
                  </div>
                ),
                allowedContent: null,
              }}
            />
            {form.value_en && (
              <div className="mt-2">
                <video
                  controls
                  src={form.value_en as string}
                  className={`rounded-lg border border-gray-300 ${inputWidthClass}`}
                />
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  // render AR input only for text and textarea types
  const renderArabicInput = () => {
    if (!selected) {
      return <div className="text-sm text-gray-500">Choose a key above to enter the appropriate value for Arabic.</div>;
    }

    if (selected.type === "text") {
      return (
        <input
          type="text"
          name="value_ar"
          dir="rtl"
          value={form.value_ar ?? ""}
          onChange={(e) => setField("value_ar", e.target.value)}
          className={`border px-2 py-1 rounded border-black bg-white ${inputWidthClass} h-[5vh] text-right`}
          placeholder={selected.placeholder ?? ""}
        />
      );
    }

    if (selected.type === "textarea") {
      return (
        <textarea
          name="value_ar"
          dir="rtl"
          value={form.value_ar ?? ""}
          onChange={(e) => setField("value_ar", e.target.value)}
          className={`border px-2 py-1 rounded border-black bg-white ${textareaWidthClass} h-[15vh] text-right`}
        />
      );
    }

    // for number/image/video types we do NOT render an Arabic input
    return null;
  };

  return (
    <main className="ml-3 xl:ml-7 mb-7">
      <div className="flex flex-col justify-start items-start border-b border-gray-500 w-[70vw] mb-7">
        <h1 className="text-lg md:text-2xl font-bold">Add New Setting</h1>
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
            <CardTitle>New Setting Details</CardTitle>
            <CardDescription>
              Pick a setting key and provide its value (all values stored as strings).
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-start gap-5 mb-7">
            {/* Select key */}
            <div className="flex flex-col gap-3">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Setting Key
              </label>

              <Select
                value={form.key_name_en}
                onValueChange={(v) => {
                  setField("key_name_en", v);
                  setField("key_name_ar", "");
                  setField("value_en", "");
                  setField("value_ar", "");
                }}
              >
                <SelectTrigger className="w-[90vw] md:w-[70vw] lg:w-[50vw] xl:w-[30vw] border border-black text-black">
                  <SelectValue placeholder="Select setting key" />
                </SelectTrigger>
                <SelectContent>
                  {availableOptions
                    .filter((opt) => !existingKeys.includes(opt.value))
                    .map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* English value input */}
            <div className="flex flex-col mt-2">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Value (English)
              </label>
              <div className="mt-1">{renderValueInput()}</div>
            </div>

            {/* Arabic value input (only for text & textarea) */}
            {selected && (selected.type === "text" || selected.type === "textarea") && (
              <div className="flex flex-col mt-2">
                <label className="text-base text-black mb-1">
                  <span className="text-red-500 text-sm">*</span> Value (Arabic)
                </label>
                <div className="mt-1">{renderArabicInput()}</div>
              </div>
            )}

            <div className="w-full flex justify-center mt-5">
              <div className="flex flex-row gap-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                  onClick={() => router.replace("/admin/dashboard/settings")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#125892] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#0f4473]"
                  disabled={isPending || isUploadingEn || isUploadingAr}
                >
                  {isPending ? "Adding..." : isUploadingEn || isUploadingAr ? "Uploading..." : "Add Setting"}
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
