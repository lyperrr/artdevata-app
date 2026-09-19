/** @format */

import { fetchServicesApi, fetchServiceByIdApi, fetchServiceBySlugApi } from "@/api";
import { ServiceItem, RawServiceData } from "@/types";

const STORAGE_BASE_URL =
  (import.meta.env.VITE_STORAGE_URL as string) || "https://admin.artdevata.net/storage";

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "dan")
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

function cleanSlug(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function normalizeService(item: RawServiceData): ServiceItem {
  let features: string[] = [];

  if (Array.isArray(item.features)) {
    features = item.features;
  } else if (typeof item.features === "string") {
    try {
      const parsed = JSON.parse(item.features);
      if (Array.isArray(parsed)) {
        features = parsed;
      } else {
        features = item.features.split(",").map((f) => f.trim()).filter(Boolean);
      }
    } catch {
      features = item.features.split(",").map((f) => f.trim()).filter(Boolean);
    }
  }

  const title = item.title || item.name || "Layanan IT";
  const name = item.name || item.title || "Layanan IT";
  const computedSlug = item.slug || slugify(title || name || `service-${item.id}`);

  let imageUrl: string | null = null;
  if (item.image && typeof item.image === "string" && item.image.trim() !== "" && item.image !== "null") {
    imageUrl = item.image.startsWith("http")
      ? item.image
      : `${STORAGE_BASE_URL.replace(/\/+$/, "")}/${item.image.replace(/^\/+/, "")}`;
  }

  return {
    id: item.id,
    name,
    title,
    description: item.description || "",
    price: item.price ?? null,
    period: item.period ?? null,
    features,
    icon: item.icon ?? null,
    image: imageUrl,
    slug: computedSlug,
    created_at: item.created_at,
    updated_at: item.updated_at,
  };
}

export async function getServices(): Promise<ServiceItem[]> {
  try {
    const res = await fetchServicesApi();
    const data = Array.isArray(res) ? res : res?.data || [];
    return data.map(normalizeService);
  } catch (error) {
    console.error("Gagal memuat daftar layanan:", error);
    return [];
  }
}

export async function getServiceById(
  id: string | number
): Promise<ServiceItem | null> {
  try {
    const res = await fetchServiceByIdApi(id);
    const data = "data" in res && res.data ? res.data : (res as RawServiceData);
    return normalizeService(data);
  } catch (error) {
    console.error(`Gagal memuat detail layanan #${id}:`, error);
    return null;
  }
}

export async function getServiceBySlug(
  slug: string
): Promise<ServiceItem | null> {
  // 1. Coba fetch langsung jika API backend support /services/:slug
  try {
    const res = await fetchServiceBySlugApi(slug);
    const data = "data" in res && res.data ? res.data : (res as RawServiceData);
    if (data && (data.id || data.title || data.name)) {
      return normalizeService(data);
    }
  } catch {
    // API endpoint /services/:slug tidak tersedia atau 404, lanjut ke fallback
  }

  // 2. Fallback: cari dari list semua service berdasarkan slug, slugified title, clean string, atau ID
  try {
    const all = await getServices();
    const targetClean = cleanSlug(slug);
    const found = all.find(
      (s) =>
        s.slug === slug ||
        cleanSlug(s.slug || "") === targetClean ||
        cleanSlug(s.title || s.name) === targetClean ||
        String(s.id) === slug
    );
    if (found) return found;
  } catch (error) {
    console.error(`Gagal memuat layanan saat fallback untuk '${slug}':`, error);
  }

  // 3. Fallback jika slug adalah numeric ID
  if (!isNaN(Number(slug))) {
    try {
      return await getServiceById(slug);
    } catch {
      // ignore
    }
  }

  return null;
}
