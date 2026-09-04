import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Trailing slashes off: the legacy site served /software.html, the new one
  // serves /software. Redirects below keep the old URLs alive for anything
  // already linked or indexed.
  async redirects() {
    const pages = [
      "index",
      "software",
      "products",
      "our-flow",
      "results",
      "case-study",
      "about",
      "contact",
      "blog",
    ];
    return [
      ...pages.map((p) => ({
        source: `/${p}.html`,
        destination: p === "index" ? "/" : `/${p}`,
        permanent: true,
      })),
      {
        source: "/blog/:slug.html",
        destination: "/blog/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
