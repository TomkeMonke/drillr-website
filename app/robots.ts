import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://getdrillr.app/sitemap.xml",
    host: "https://getdrillr.app",
  };
}
