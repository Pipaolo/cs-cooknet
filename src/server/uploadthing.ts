import { getAuth } from "@clerk/nextjs/server";

import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  postImageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(({ req, res }) => {
      // This code runs on your server before upload
      //   const auth = getAuth(req);
      // If you throw, the user will not be able to upload
      //   if (!auth.userId) throw new Error("Unauthorized");
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      //   return { auth: auth };
      return {};
    })
    .onUploadComplete(({ metadata, file }) => {
      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
