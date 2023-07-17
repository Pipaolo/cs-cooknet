import { generateOpenApiDocument } from "trpc-openapi";
import { appRouter } from "./root";

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "Threads.io API",
  version: "1.0.0",
  baseUrl: "http://localhost:3000/api",
  docsUrl: "http://localhost:3000/api/docs",
});
