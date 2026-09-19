/** @format */

import fs from "fs";
import path from "path";
import axios from "axios";

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

async function generateSitemap() {
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

  // 1. Fetch Dynamic Services
  try {
    const res = await axios.get(`${API_BASE}/services`, { timeout: 10000 });
    const services = Array.isArray(res.data) ? res.data : res.data?.data || [];
    services.forEach((s) => {
      const slug = s.slug || slugify(s.title || s.name || `service-${s.id}`);
      dynamicRoutes.push({
        url: `/layanan/${slug}`,
        priority: "0.9",
        changefreq: "weekly",
      });
    });
    console.log(`[Sitemap] Added ${services.length} services.`);
  } catch (err) {
    console.warn("[Sitemap] Could not fetch services, using fallback:", err.message);
  }

  // 2. Fetch Dynamic Portfolios
  try {
    const res = await axios.get(`${API_BASE}/portfolios`, { timeout: 10000 });
    const portfolios = Array.isArray(res.data) ? res.data : res.data?.data || [];
    portfolios.forEach((p) => {
      dynamicRoutes.push({
        url: `/portfolio/${p.id}`,
        priority: "0.7",
        changefreq: "monthly",
      });
    });
    console.log(`[Sitemap] Added ${portfolios.length} portfolio items.`);
  } catch (err) {
    console.warn("[Sitemap] Could not fetch portfolios:", err.message);
  }

  // 3. Fetch Dynamic Blogs
  try {
    const res = await axios.get(`${API_BASE}/blogs`, { timeout: 10000 });
    const blogs = Array.isArray(res.data) ? res.data : res.data?.data || [];
    blogs.forEach((b) => {
      dynamicRoutes.push({
        url: `/blog/${b.id}`,
        priority: "0.7",
        changefreq: "weekly",
      });
    });
    console.log(`[Sitemap] Added ${blogs.length} blog posts.`);
  } catch (err) {
    console.warn("[Sitemap] Could not fetch blogs:", err.message);
  }

  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (item) => `  <url>
    <loc>${SITE_URL}${item.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

  const outputPath = path.resolve("./public/sitemap.xml");
  fs.writeFileSync(outputPath, xmlContent, "utf8");
  console.log(`[Sitemap] Successfully updated ${outputPath}`);
}

generateSitemap();
