import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// This is your FileRouter. It defines the different upload endpoints for your app.
export const ourFileRouter = {
  // An endpoint for banner images. Allows 1 image up to 4MB.
  banners: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(() => {
      // Middleware runs on the server before upload.
      // Here you could check if a user is authenticated, for example.
      // We'll return a mock user ID for now.
      return { userId: "nuremberggroupjo-ship-it" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Banner Upload Complete for userId:", metadata.userId);
      console.log("file url", file.url);
      // Whatever is returned here is sent to the client-side `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),

  // An endpoint for consulting images. Allows up to 5 images, 2MB each.
  consulting: f({ image: { maxFileSize: "2MB", maxFileCount: 5 } })
    .middleware(() => {
      return { userId: "nuremberggroupjo-ship-it" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Consulting Upload Complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),

  // An endpoint for team member photos.
  ourTeam: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(() => {
      return { userId: "nuremberggroupjo-ship-it" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Our Team Upload Complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),

    // An endpoint for client logos.
    ourClients: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(() => {
      return { userId: "nuremberggroupjo-ship-it" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Our Clients Upload Complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;