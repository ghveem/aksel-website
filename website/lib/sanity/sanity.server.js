// lib/sanity.server.js
import { createClient } from "next-sanity";

const config = {
  projectId: "hnbe3yhs",
  dataset: "production",
  useCdn: false,
  apiVersion: "2021-05-31",
};

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient({
  ...config,
  // eslint-disable-next-line no-undef
  token: process.env.SANITY_PRIVATE_NO_DRAFTS,
});

// Set up a preview client with serverless authentication for drafts
export const previewClient = createClient({
  ...config,
  // eslint-disable-next-line no-undef
  token: process.env.SANITY_PREVIEW_TOKEN,
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const noCdnClient = (token) =>
  createClient({
    ...config,
    token,
  });

// Helper function for easily switching between normal client and preview client
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getClient = (usePreview) =>
  usePreview ? previewClient : sanityClient;
