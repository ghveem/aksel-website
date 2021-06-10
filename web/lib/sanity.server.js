// lib/sanity.server.js
import { createClient } from "next-sanity";
import { config } from "./config";

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config);

// Set up a preview client with serverless authentication for drafts
export const previewClient = createClient({
  ...config,
  useCdn: false,
  token:
    "skXMkLVwRPUcKEyYa92OfXtwSmDiaFoSPTG23GMisJ3ExGWTOITHBnDjtYfWTUsxhrGswGAdSUGyLDaMr7PrnPfMIeenZOgIjCIPI4x8NRpfNi8KwyzI2fYPLiPxD7vOEFdmvtnGNs64eQUjElnqZkULNMJGQVjjZLHm8QkfKqkX5REdifzk",
});

// Helper function for easily switching between normal client and preview client
export const getClient = (usePreview) => (usePreview ? previewClient : sanityClient);
