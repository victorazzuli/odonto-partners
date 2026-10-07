import type { Metadata } from "next";
import { site, fullAddress } from "@/config/site";
import type { Course } from "@/data/courses";
import type { Post } from "@/data/content";
import { professors } from "@/data/professors";

export function pageMeta({ title, description, path, image }: { title?: string; description: string; path: string; image?: string }): Metadata {
  const url = `${site.url}${path}`;
  const t = title ?? site.defaultTitle;
  return {
    title: title ?? { absolute: site.defaultTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: t,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: "website",
      images: [{ url: image ?? "/og.jpg", width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title: t, description, images: [image ?? "/og.jpg"] },
  };
}

const postal = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: site.address.city,
  addressRegion: site.address.state,
  addressCountry: site.address.country,
  ...(site.address.postalCode ? { postalCode: site.address.postalCode } : {}),
};

export const orgId = `${site.url}/#organization`;
export const clinicId = `${site.url}/#clinic`;

export function organizationLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": ["EducationalOrganization", "Organization"],
      "@id": orgId,
      name: site.name,
      url: site.url,
      logo: `${site.url}/icon.svg`,
      description: site.description,
      foundingDate: String(site.foundingYear),
      founder: site.founders.map((name) => ({ "@type": "Person", name })),
      email: site.contact.email,
      telephone: site.contact.phones[0].tel,
      address: postal,
      sameAs: [site.social.instagram.url, site.social.facebook.url, site.social.youtube.url],
    },
    {
      "@context": "https://schema.org",
      "@type": ["Dentist", "MedicalBusiness", "LocalBusiness"],
      "@id": clinicId,
      name: `${site.name} — Clínica-Escola`,
      url: `${site.url}/paciente-modelo`,
      image: `${site.url}/og.jpg`,
      telephone: `+${site.whatsapp.pacientes.number}`,
      email: site.contact.email,
      address: postal,
      openingHours: site.contact.hoursSchema,
      parentOrganization: { "@id": orgId },
      ...(site.address.geo ? { geo: { "@type": "GeoCoordinates", latitude: site.address.geo.lat, longitude: site.address.geo.lng } } : {}),
      medicalSpecialty: "Dentistry",
      areaServed: fullAddress,
    },
  ];
}

export function courseLd(c: Course) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: c.title,
    description: c.summary ?? `${c.title} — Odonto Partners`,
    url: `${site.url}/curso/${c.slug}`,
    provider: { "@type": "EducationalOrganization", "@id": orgId, name: site.name, sameAs: site.url },
    ...(c.image ? { image: c.image } : {}),
    inLanguage: "pt-BR",
    ...(c.start
      ? {
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "onsite",
            startDate: c.start,
            endDate: c.end,
            location: { "@type": "Place", name: c.location ?? site.name, address: postal },
            ...(c.professors?.length
              ? { instructor: c.professors.map((s) => ({ "@type": "Person", name: professors.find((p) => p.slug === s)?.name })) }
              : {}),
          },
        }
      : {}),
  };
}

export function articleLd(p: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.excerpt,
    url: `${site.url}/blog/${p.slug}`,
    inLanguage: "pt-BR",
    author: p.author ? { "@type": "Person", name: p.author } : { "@type": "Organization", name: site.name },
    publisher: { "@id": orgId },
    ...(p.date ? { datePublished: p.date } : {}),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
