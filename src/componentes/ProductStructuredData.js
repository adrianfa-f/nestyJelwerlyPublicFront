// components/ProductStructuredData.js
import { useEffect } from "react";

const ProductStructuredData = ({ product }) => {
  useEffect(() => {
    if (!product) return;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description,
      image: product.image1
        ? [
            product.image1,
            product.image2,
            product.image3,
            product.image4,
          ].filter(Boolean)
        : [],
      sku: product.sku || product.id.toString(),
      mpn: product.id.toString(),
      brand: {
        "@type": "Brand",
        name: "Nesty Luxe Jewelry",
      },
      offers: {
        "@type": "Offer",
        url: window.location.href,
        priceCurrency: "EUR",
        price: product.price,
        availability:
          product.stock > 0
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        itemCondition: "https://schema.org/NewCondition",
      },
      ...(product.reviews && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.averageRating,
          reviewCount: product.reviewCount,
        },
      }),
    };

    // Eliminar script anterior
    const existingScript = document.getElementById("product-structured-data");
    if (existingScript) {
      existingScript.remove();
    }

    // Agregar nuevo script
    const script = document.createElement("script");
    script.id = "product-structured-data";
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, [product]);

  return null;
};

export default ProductStructuredData;
