// hooks/useSEO.js
import { useEffect } from "react";

const useSEO = ({
  title = "Nesty Luxe Jewelry - Joyería Artesanal de Calidad",
  description = "Descubre nuestra exclusiva colección de joyas artesanales. Anillos, collares, pulseras y más. Envío gratis y garantía de calidad.",
  keywords = "joyería, joyas artesanales, anillos, collares, pulseras, aretes, joyería fina, regalos",
  image = "/images/og-image.jpg",
  url = window.location.href,
  type = "website",
  author = "Nesty Luxe Jewelry",
}) => {
  useEffect(() => {
    // Título principal
    document.title = title;

    // Meta tags básicos
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("author", author);

    // Open Graph (Facebook, LinkedIn, etc.)
    updateMetaTag("og:title", title, "property");
    updateMetaTag("og:description", description, "property");
    updateMetaTag("og:image", image, "property");
    updateMetaTag("og:url", url, "property");
    updateMetaTag("og:type", type, "property");
    updateMetaTag("og:site_name", "Nesty Luxe Jewelry", "property");

    // Twitter Card
    updateMetaTag("twitter:card", "summary_large_image", "name");
    updateMetaTag("twitter:title", title, "name");
    updateMetaTag("twitter:description", description, "name");
    updateMetaTag("twitter:image", image, "name");
    updateMetaTag("twitter:site", "@nestyluxe", "name");

    // Canonical URL
    updateLinkTag("canonical", url);

    // Structured Data (JSON-LD)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": type === "product" ? "Product" : "WebSite",
      name: "Nesty Luxe Jewelry",
      description: description,
      url: window.location.origin,
      ...(type === "product"
        ? {
            offers: {
              "@type": "Offer",
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
            },
          }
        : {}),
    };

    // Eliminar structured data anterior si existe
    const existingScript = document.getElementById("structured-data");
    if (existingScript) {
      existingScript.remove();
    }

    // Agregar nuevo structured data
    const script = document.createElement("script");
    script.id = "structured-data";
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, [title, description, keywords, image, url, type, author]);
};

const updateMetaTag = (name, content, attribute = "name") => {
  let tag = document.querySelector(`meta[${attribute}="${name}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

const updateLinkTag = (rel, href) => {
  let tag = document.querySelector(`link[rel="${rel}"]`);

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", href);
};

export default useSEO;
