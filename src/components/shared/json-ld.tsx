import { personal, socials } from "@/data";
import { siteConfig } from "@/constants/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personal.name,
    jobTitle: personal.role,
    description: personal.bio,
    url: siteConfig.url,
    email: personal.email,
    sameAs: socials
      .filter((s) => s.platform !== "email")
      .map((s) => s.url),
    knowsAbout: siteConfig.keywords,
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
