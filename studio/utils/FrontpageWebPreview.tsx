import React from "react";
import { WebPreviewWrapper } from "./PreviewWrapper";

export const FrontpageWebPreview = (ctx: any) => {
  const previewUrl = `/?preview=true`;
  const webUrl = "https://verktoykasse-prototype-kenajoh.vercel.app/";
  const url =
    process.env.NODE_ENV === "production"
      ? webUrl + previewUrl
      : `http://localhost:3000${previewUrl}`;

  return <WebPreviewWrapper url={url} />;
};
