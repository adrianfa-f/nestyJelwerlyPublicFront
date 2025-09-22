// services/sitemapService.js (para generar sitemap dinámicamente)
export const generateSitemap = (products, baseUrl) => {
  const urls = [
    { loc: baseUrl, changefreq: "daily", priority: "1.0" },
    { loc: `${baseUrl}/catalog`, changefreq: "weekly", priority: "0.8" },
    { loc: `${baseUrl}/about`, changefreq: "monthly", priority: "0.5" },
    { loc: `${baseUrl}/contact`, changefreq: "monthly", priority: "0.5" },
  ];

  // Agregar productos
  products.forEach((product) => {
    urls.push({
      loc: `${baseUrl}/product/${product.id}`,
      changefreq: "weekly",
      priority: "0.7",
      lastmod: product.updatedAt || new Date().toISOString(),
    });
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
    <url>
      <loc>${url.loc}</loc>
      <changefreq>${url.changefreq}</changefreq>
      <priority>${url.priority}</priority>
      ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ""}
    </url>
  `
    )
    .join("")}
</urlset>`;
};
