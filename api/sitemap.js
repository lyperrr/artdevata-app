/** @format */

const API_BASE = "https://admin.artdevata.net/api";
const SITE_URL = "https://artdevata.net";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "dan")
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export default async function handler(req, res) {
  const today = new Date().toISOString().split("T")[0];

  const staticRoutes = [
    { url: "/", priority: "1.0", changefreq: "weekly" },
    { url: "/tentang", priority: "0.8", changefreq: "monthly" },
    { url: "/layanan", priority: "0.9", changefreq: "weekly" },
    { url: "/portfolio", priority: "0.8", changefreq: "weekly" },
    { url: "/blog", priority: "0.8", changefreq: "daily" },
    { url: "/kontak", priority: "0.6", changefreq: "monthly" },
  ];

  let dynamicRoutes = [];

  try {
    // 1. Fetch Dynamic Services
    try {
      const response = await fetch(`${API_BASE}/services`, {
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        const json = await response.json();
        const services = Array.isArray(json) ? json : json?.data || [];
        services.forEach((s) => {
          const slug = s.slug || slugify(s.title || s.name || `service-${s.id}`);
          dynamicRoutes.push({
            url: `/layanan/${slug}`,
            priority: "0.9",
            changefreq: "weekly",
            lastmod: s.updated_at ? s.updated_at.split("T")[0] : today,
          });
        });
      }
    } catch (e) {
      console.error("Error fetching services for sitemap:", e);
    }

    // 2. Fetch Dynamic Portfolios
    try {
      const response = await fetch(`${API_BASE}/portfolios`, {
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        const json = await response.json();
        const portfolios = Array.isArray(json) ? json : json?.data || [];
        portfolios.forEach((p) => {
          dynamicRoutes.push({
            url: `/portfolio/${p.id}`,
            priority: "0.7",
            changefreq: "monthly",
            lastmod: p.updated_at ? p.updated_at.split("T")[0] : today,
          });
        });
      }
    } catch (e) {
      console.error("Error fetching portfolios for sitemap:", e);
    }

    // 3. Fetch Dynamic Blogs
    try {
      const response = await fetch(`${API_BASE}/blogs`, {
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        const json = await response.json();
        const blogs = Array.isArray(json) ? json : json?.data || [];
        blogs.forEach((b) => {
          dynamicRoutes.push({
            url: `/blog/${b.id}`,
            priority: "0.7",
            changefreq: "weekly",
            lastmod: b.updated_at ? b.updated_at.split("T")[0] : today,
          });
        });
      }
    } catch (e) {
      console.error("Error fetching blogs for sitemap:", e);
    }

    const allRoutes = [...staticRoutes, ...dynamicRoutes];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (item) => `  <url>
    <loc>${SITE_URL}${item.url}</loc>
    <lastmod>${item.lastmod || today}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=1800, stale-while-revalidate=86400"
    );
    return res.status(200).send(xml);
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return res.status(500).send("Error generating sitemap");
  }
}
