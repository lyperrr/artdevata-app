/** @format */

import { fetchServicesApi, fetchServiceByIdApi } from "@/api";
import { ServiceItem, RawServiceData } from "@/types";

function normalizeService(item: RawServiceData): ServiceItem {
  let features: string[] = [];

  if (Array.isArray(item.features)) {
    features = item.features;
  } else if (typeof item.features === "string") {
    features = item.features.split(",").map((f) => f.trim());
  }

  return {
    id: item.id,
    name: item.name || item.title || "Layanan IT",
    title: item.title || item.name || "Layanan IT",
    description: item.description || "",
    price: item.price ?? null,
    period: item.period ?? null,
    features,
    icon: item.icon ?? null,
    slug: item.slug,
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
