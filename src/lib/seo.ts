import type { Metadata } from "next";
import { personal } from "@/data";
import { siteConfig } from "@/constants/site";

interface BuildMetadataInput {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex,
}: BuildMetadataInput = {}): Metadata {
  const finalTitle = title
    ? `${title} — ${personal.name}`
    : `${personal.name} — ${personal.role}`;
  const finalDescription = description ?? personal.bio;
  const url = new URL(path, siteConfig.url).toString();

  return {
    title: finalTitle,
    description: finalDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url,
      siteName: personal.name,
      type: "website",
      locale: "en_US",
      ...(image
        ? { images: [{ url: image, width: 1200, height: 630, alt: personal.name }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      ...(image ? { images: [image] } : {}),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    icons: {
      icon: "/icon.svg",
      apple: "/apple-touch-icon.png",
    },
  };
}
